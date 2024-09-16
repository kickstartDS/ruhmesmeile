const StoryblokClient = require("storyblok-js-client");
const importStory = require("../resources/import.json");

require("@dotenvx/dotenvx").config({ path: ".env.local" });

if (!process.env.NEXT_STORYBLOK_SPACE_ID)
  throw new Error("Missing NEXT_STORYBLOK_SPACE_ID env variable");
if (!process.env.NEXT_STORYBLOK_OAUTH_TOKEN)
  throw new Error("Missing NEXT_STORYBLOK_OAUTH_TOKEN env variable");

const Storyblok = new StoryblokClient({
  oauthToken: process.env.NEXT_STORYBLOK_OAUTH_TOKEN,
});

const prepare = async () => {
  try {
    // Add Story to space
    await Storyblok.post(
      `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/stories/`,
      {
        story: importStory.story,
        publish: 0,
      }
    );
  } catch (error) {
    console.error(
      "There was an error importing the Story",
      JSON.stringify(error, null, 2)
    );
  }
};

prepare();
