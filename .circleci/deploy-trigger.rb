#!/usr/bin/env ruby
# Resolves what triggered this pipeline before the deploy runs.
#
# Storyblok content publishes reach us through a project webhook trigger, so an editor
# publishing a story rebuilds and redeploys the site. That is intentional. Two things must
# not happen:
#
#   1. Concurrent content deploys racing on the deploy host. Every content rebuild used to
#      ship as the same tag (main's head sha), and kamal removes then re-pulls that tag
#      before it takes the deploy lock -- so two runs would delete each other's image and
#      fail on "Image ... is missing the 'service' label". Content deploys therefore get a
#      unique version, so no two of them ever touch the same tag.
#   2. A burst of publishes causing a burst of identical deploys. A Storyblok bulk publish
#      (content migration, folder move) fires one webhook per story. Any run that a newer
#      run will supersede halts here, before it builds: the newer run reads the same commit
#      and picks up the same content.
#
# Code pushes are never coalesced or re-versioned: a push always deploys, under its own sha.

require "json"
require "net/http"
require "uri"

API = "https://circleci.com/api/v2"
SLUG = "gh/kickstartDS/ruhmesmeile"

# Storyblok's webhook payload carries {"action": ..., "story_id": ..., "full_slug": ...}.
# The "Circle CI" project webhook endpoint subscribes to all four of these.
CONTENT_ACTIONS = %w[published unpublished deleted moved].freeze

def api_get(path)
  uri = URI("#{API}#{path}")
  response = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 10, read_timeout: 20) do |http|
    http.get(uri)
  end
  return nil unless response.is_a?(Net::HTTPSuccess)

  JSON.parse(response.body)
rescue StandardError => e
  warn "deploy-trigger: GET #{path} failed (#{e.class}: #{e.message}) -- continuing without it"
  nil
end

def webhook_body(pipeline)
  body = JSON.parse(pipeline.dig("trigger_parameters", "webhook", "body").to_s)
  body.is_a?(Hash) ? body : {}
rescue StandardError
  {}
end

def content_publish?(pipeline)
  return false unless pipeline.dig("trigger", "type").to_s.start_with?("webhook")

  body = webhook_body(pipeline)
  CONTENT_ACTIONS.include?(body["action"].to_s) && !body["story_id"].to_s.empty?
end

def persist(name, value)
  return puts("deploy-trigger: BASH_ENV unset, cannot persist #{name}") unless ENV["BASH_ENV"]

  File.open(ENV["BASH_ENV"], "a") { |file| file.puts("export #{name}=#{value}") }
end

def halt(reason)
  puts "deploy-trigger: #{reason}"
  # circleci-agent ships with every job; `exit 0` alone would only end this step.
  system("circleci-agent step halt")
  exit 0
end

pipeline_id = ENV["CIRCLE_PIPELINE_ID"]
pipeline_number = ENV["CIRCLE_PIPELINE_NUMBER"].to_i
unless pipeline_id && pipeline_number.positive?
  puts "deploy-trigger: no pipeline context (local run) -- nothing to resolve"
  exit 0
end

own = api_get("/pipeline/#{pipeline_id}")
unless own
  puts "deploy-trigger: cannot read pipeline ##{pipeline_number} -- deploying without coalescing"
  exit 0
end

puts "deploy-trigger: pipeline ##{pipeline_number}, trigger #{own.dig("trigger", "type").inspect}"

unless content_publish?(own)
  puts "deploy-trigger: not a content publish -- plain code deploy, never coalesced"
  exit 0
end

body = webhook_body(own)
puts "deploy-trigger: content #{body["action"]} -- #{body["full_slug"] || body["story_id"]}"

recent = api_get("/project/#{SLUG}/pipeline")
unless recent
  puts "deploy-trigger: cannot list recent pipelines -- deploying this publish"
  exit 0
end

newer = Array(recent["items"]).select { |item| item["number"].to_i > pipeline_number }
superseding = newer.select do |item|
  # Anything newer that also deploys main picks up this publish: a later content webhook,
  # or a push to main (same commit, same content).
  content_publish?(item) || item.dig("vcs", "branch") == "main"
end

unless superseding.empty?
  numbers = superseding.map { |item| item["number"] }.sort
  halt("superseded by pipeline ##{numbers.first}" \
       "#{numbers.size > 1 ? " (+#{numbers.size - 1} more)" : ""} -- that run deploys this publish")
end

puts "deploy-trigger: newest run for this content -- deploying"

sha = `git rev-parse --short=12 HEAD`.strip
version = "#{sha}_content_#{Time.now.utc.strftime("%Y%m%d%H%M%S")}"
puts "deploy-trigger: content deploy gets its own image tag (#{version}) so concurrent runs cannot collide"
persist("VERSION", version)
