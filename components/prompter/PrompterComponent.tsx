import {
  FC,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { traverse as objectTraverse } from "object-traversal";
import { defaultObjectForSchema } from "@kickstartds/cambria";
import { SelectField } from "@kickstartds/form/lib/select-field";
import { JSONSchema } from "json-schema-typed/draft-07";
import { InfinitySpin } from "react-loader-spinner";
import schemaTraverse from "json-schema-traverse";
import merge from "deepmerge";

import { Section } from "@kickstartds/ds-agency-premium/section";
import { Button } from "@kickstartds/ds-agency-premium/button";
import { Faq } from "@kickstartds/ds-agency-premium/faq";

import { PageProps } from "@kickstartds/ds-agency-premium/page";
import { Contact } from "@kickstartds/ds-agency-premium/contact";
import { Cta } from "@kickstartds/ds-agency-premium/cta";
import { Features } from "@kickstartds/ds-agency-premium/features";
import { Stats } from "@kickstartds/ds-agency-premium/stats";
import { TeaserCard } from "@kickstartds/ds-agency-premium/teaser-card";
import { Testimonials } from "@kickstartds/ds-agency-premium/testimonials";
import { Text } from "@kickstartds/ds-agency-premium/text";
import { Hero } from "@kickstartds/ds-agency-premium/hero";

import pageSchema from "@kickstartds/ds-agency-premium/page/page.schema.dereffed.json";
import { ContentPrompterProps } from "./PrompterProps";

function getSchemaName(schemaId: string): string {
  return (schemaId && schemaId.split("/").pop()?.split(".").shift()) || "";
}

const unsupportedKeywords = [
  "format",
  "minItems",
  "maxItems",
  "minimum",
  "maximum",
  "examples",
  "default",
  "$id",
  "$schema",
];

const propertiesToDrop = [
  "backgroundColor",
  "spotlight",
  "headerSpacing",
  "switchOrder",
  "align",
  "textAlign",
  "colorNeutral",
  "target",
  "contentAlign",
  "textColor",
  "highlightText",
  "fullWidth",
  "padding",
  "mobileImageLast",
  "desktopImageLast",
  "overlay",
  "indent",
  "imageRatio",
  "image",
  "width",
  "inverted",
  "spaceBefore",
  "spaceAfter",
  "height",
];

const components = [
  "page",
  "section",
  "contact",
  "cta",
  "faq",
  "features",
  // "gallery",
  "stats",
  "teaser-card",
  "testimonials",
  "text",
  // "image-story",
  // "image-text",
  // "logos",
  "hero",
  // "mosaic",
  // "slider",
  // "video-curtain",
];

const subComponentMap = {
  faq: "questions",
  features: "feature",
  // gallery: Gallery,
  stats: "stat",
  testimonials: "testimonial",
  // logos: Logos,
  // mosaic: Mosaic,
  // slider: Slider,
  // "video-curtain": VideoCurtain,
} as const;

type SubComponentMapKeys = keyof typeof subComponentMap;

function isSubComponentMapKey(key: string): key is SubComponentMapKeys {
  return key in subComponentMap;
}

const componentMap = {
  contact: Contact,
  cta: Cta,
  faq: Faq,
  features: Features,
  // gallery: Gallery,
  stats: Stats,
  "teaser-card": TeaserCard,
  testimonials: Testimonials,
  text: Text,
  // "image-story": ImageStory,
  // "image-text": ImageText,
  // logos: Logos,
  hero: Hero,
  // mosaic: Mosaic,
  // slider: Slider,
  // "video-curtain": VideoCurtain,
} as const;

type ComponentMapKeys = keyof typeof componentMap;

function isComponentMapKey(key: string): key is ComponentMapKeys {
  return key in componentMap;
}

const schemaMap = {
  page: {},
  section: {},
  contact: {},
  cta: {},
  faq: {},
  questions: {},
  feature: {},
  features: {},
  // gallery: {},
  stat: {},
  stats: {},
  "teaser-card": {},
  testimonial: {},
  testimonials: {},
  text: {},
  // "image-story": {},
  // "image-text": {},
  // logos: {},
  hero: {},
  // mosaic: {},
  // slider: {},
  // "video-curtain": {},
} as const;

type SchemaMapKeys = keyof typeof schemaMap;

function isSchemaMapKey(key: string): key is SchemaMapKeys {
  return key in schemaMap;
}

// TODO type this, might involve pre-processing the schema to generate types in filesystem using `json-schema-to-typescript`
const processResponse = (response: Record<string, any>): PageProps => {
  objectTraverse(
    response,
    ({ value }) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        const typePropKey = Object.keys(value).find((key) =>
          key.startsWith("type__")
        );

        if (typePropKey) {
          const type = typePropKey.split("type__")[1];
          if (!isSchemaMapKey(type)) throw new Error(`Unknown type: ${type}`);
          const schema = schemaMap[type];

          if (schema) {
            const defaults = defaultObjectForSchema(
              schema as JSONSchema.Object
            ) as Record<string, any>;

            delete value[typePropKey];
            value.type = type;
            value.component = type;

            for (const prop of Object.keys(defaults)) {
              value[prop] = value[prop]
                ? typeof value[prop] === "object" && !Array.isArray(value[prop])
                  ? merge(value[prop], defaults[prop])
                  : value[prop]
                : defaults[prop];
            }
          }
        }
      }
    },
    { traversalType: "breadth-first" }
  );

  return response as PageProps;
};

/*

Compare flatten to this one from Starter `prepareProject.js`:

      traverse(preset.preset, ({ parent, key, value }) => {
        if (typeof value === "object" && isNaN(key) && !Array.isArray(value)) {
          for (const [propKey, propValue] of Object.entries(value)) {
            parent[`${key}_${propKey}`] = propValue;
          }
          delete parent[key];
        }
      });

*/

const processPage = (page: PageProps): Record<string, any> => {
  objectTraverse(
    page,
    ({ value }) => {
      if (typeof value === "object" && value.type) {
        value.component = value.type;

        for (const prop of Object.keys(value)) {
          if (
            !value[prop].type &&
            typeof value[prop] === "object" &&
            !Array.isArray(value[prop])
          ) {
            for (const nestedProp of Object.keys(value[prop])) {
              value[`${prop}_${nestedProp}`] = structuredClone(
                value[prop][nestedProp]
              );
            }
            delete value[prop];
          }
        }
      }
    },
    { traversalType: "breadth-first" }
  );

  return page as Record<string, any>;
};

// TODO handle `type` in props, currently just gets passed through
const Page: FC<PropsWithChildren<PageProps>> = ({ section }) => {
  return (
    <>
      {section?.map((section, index) => {
        const { components, ...props } = section;
        return (
          <Section key={index} {...props}>
            {components?.map((component, index) => {
              const type = component.type;
              if (!isComponentMapKey(type))
                throw new Error(`Unknown component type: ${type}`);
              const Component = componentMap[type];
              return <Component key={index} {...component} />;
            })}
          </Section>
        );
      })}
    </>
  );
};

export const PrompterComponent = forwardRef<
  HTMLDivElement,
  ContentPrompterProps & HTMLAttributes<HTMLDivElement>
>(
  (
    {
      sections,
      includeStory,
      relatedStories,
      userPrompt,
      systemPrompt,
      ...props
    },
    ref
  ) => {
    const [generatedContent, setGeneratedContent] =
      useState<Record<string, any>>(null);
    const [storyblokContent, setStoryblokContent] =
      useState<Record<string, any>>(null);

    const schema = useMemo(() => {
      const allProperties: Set<string> = new Set();
      let maxDepth = 0;

      const collectSchemas = (schema) => {
        if (
          schema.properties &&
          schema.properties.type &&
          schema.properties.type.const
        ) {
          schemaMap[schema.properties.type.const] = structuredClone(schema);
        }
      };

      const filterComponents = (schema) => {
        if (schema && schema.anyOf) {
          schema.anyOf = schema.anyOf.filter((component) => {
            return components.includes(component.properties.type.const);
          });
        }
      };

      const deleteConsts = (
        schema,
        jsonPtr,
        _rootSchema,
        _parentJsonPtr,
        parentKeyword,
        parentSchema
      ) => {
        if (schema.const && parentKeyword === "properties") {
          const propName = jsonPtr.split("/").pop();

          if (propName === "type") {
            const type = { properties: {} };
            type.properties[`type__${schema.const}`] = {
              type: "string",
              title: "Type of component",
              description: `A field always being set to the value '${schema.const}'`,
            };
            parentSchema.properties = {
              ...type.properties,
              ...parentSchema.properties,
            };
          }

          delete parentSchema.properties[propName];
        }
      };

      const removeImageFormatProperties = (
        schema,
        _jsonPtr,
        _rootSchema,
        _parentJsonPtr,
        _parentKeyword,
        parentSchema,
        keyIndex
      ) => {
        if (
          (schema.format === "image" || schema.format === "video") &&
          parentSchema &&
          parentSchema.properties &&
          parentSchema.properties[keyIndex]
        ) {
          delete parentSchema.properties[keyIndex];
        }
      };

      const removeIconProperties = (
        _schema,
        _jsonPtr,
        _rootSchema,
        _parentJsonPtr,
        _parentKeyword,
        parentSchema,
        keyIndex
      ) => {
        if (
          keyIndex === "icon" &&
          parentSchema &&
          parentSchema.properties &&
          parentSchema.properties[keyIndex]
        ) {
          delete parentSchema.properties[keyIndex];
        }
      };

      const removeUnsupportedProperties = (
        _schema,
        _jsonPtr,
        _rootSchema,
        _parentJsonPtr,
        _parentKeyword,
        parentSchema,
        keyIndex
      ) => {
        if (
          propertiesToDrop.includes(keyIndex) &&
          parentSchema &&
          parentSchema.properties &&
          parentSchema.properties[keyIndex]
        ) {
          delete parentSchema.properties[keyIndex];
        }
      };

      const removeUnsupportedKeywords = (schema) => {
        for (const key of unsupportedKeywords) {
          if (schema.hasOwnProperty(key)) delete schema[key];
        }
      };

      const removeEmptyObjects = (
        schema,
        _jsonPtr,
        _rootSchema,
        _parentJsonPtr,
        _parentKeyword,
        parentSchema,
        keyIndex
      ) => {
        if (
          schema.type === "object" &&
          !Object.keys(schema.properties).length &&
          parentSchema &&
          parentSchema.properties &&
          parentSchema.properties[keyIndex]
        ) {
          delete parentSchema.properties[keyIndex];
        }
      };

      const denyAdditionalProperties = (schema) => {
        if (schema.type === "object") {
          schema.additionalProperties = false;
        }
      };

      const makeRequired = (schema) => {
        if (schema.type === "object") {
          schema.required = Object.keys(schema.properties);
        }
      };

      const collectProperties = (
        _schema,
        jsonPtr,
        _rootSchema,
        _parentJsonPtr,
        parentKeyword
      ) => {
        if (
          jsonPtr &&
          parentKeyword === "properties" &&
          !allProperties.has(jsonPtr)
        ) {
          allProperties.add(jsonPtr);
        }
      };

      const countDepth = (_schema, jsonPtr) => {
        maxDepth = Math.max(jsonPtr.split("/properties/").length, maxDepth);
        if (jsonPtr.split("/properties/").length > 6) {
          console.log("Max depth exceeded:", jsonPtr);
        }
      };

      schemaTraverse(pageSchema, collectSchemas);
      const clonedSchema = structuredClone(pageSchema);

      delete clonedSchema.properties.header;
      delete clonedSchema.properties.footer;
      delete clonedSchema.properties.section.items.properties.content; // TODO check this, could possibly be improved by better AI guidance for those types of values

      clonedSchema.properties.section.minItems = sections;
      clonedSchema.properties.section.maxItems = sections;

      for (const componentSchema of clonedSchema.properties.section.items
        .properties.components.items.anyOf) {
        const componentName = getSchemaName(componentSchema.$id);
        const arrayKey = subComponentMap[componentName];
        if (Object.keys(subComponentMap).includes(componentName)) {
          componentSchema.properties[arrayKey].items.properties.type = {
            const: arrayKey,
          };
        }
      }

      [
        filterComponents,
        deleteConsts,
        removeImageFormatProperties,
        removeIconProperties,
        removeUnsupportedProperties,
        removeUnsupportedKeywords,
        removeEmptyObjects,
        denyAdditionalProperties,
        makeRequired,
        collectProperties,
        countDepth,
      ].forEach((fn) => {
        schemaTraverse(clonedSchema, fn);
      });

      if (allProperties.size > 100) {
        console.log(
          "Need to reduce properties (<100 allowed), got:",
          allProperties.size,
          allProperties
        );
      }

      return {
        name: "page_response",
        strict: true,
        schema: clonedSchema,
      };
    }, [sections]);

    const [ideas, setIdeas] = useState([]);
    const [idea, setIdea] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const ideaSelectRef = useRef(null);

    const createPrompt = (idea) => {
      const prompt: string[] = [];

      objectTraverse(
        ideas.find((object) => object.id === idea),
        ({ value }) => {
          if (value && value.type && value.type === "text" && value.text)
            prompt.push(value.text);
        }
      );

      return `${userPrompt}. For the following idea: ${prompt.join(" ")}`;
    };

    useEffect(() => {
      fetch("https://www.ruhmesmeile.com/api/ideas")
        .then((response) => {
          response.json().then((json) => {
            setIdeas(json.response.data.ideas);
          });
        })
        .catch((error) => console.error(error));
    }, []);

    const handleGenerate = async () => {
      setLoading(true);
      fetch("https://pzdzoelitkqizxopmwfg.supabase.co/functions/v1/content", {
        method: "POST",
        body: JSON.stringify({
          system: systemPrompt,
          prompt: createPrompt(idea),
          schema,
        }),
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHpvZWxpdGtxaXp4b3Btd2ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0ODAzMzQsImV4cCI6MTk5NDA1NjMzNH0.FYWwK6ByCPr7clUJ66b_8njSQ1EOQQLrEujQnnIVeUo",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHpvZWxpdGtxaXp4b3Btd2ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0ODAzMzQsImV4cCI6MTk5NDA1NjMzNH0.FYWwK6ByCPr7clUJ66b_8njSQ1EOQQLrEujQnnIVeUo",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.json().then((json) => {
            console.log("JSON received", json);
            const pageProps = processResponse(JSON.parse(json.content));
            setGeneratedContent(pageProps);

            console.log("Pageprops", pageProps);

            const storyblokProps = processPage(structuredClone(pageProps));
            setStoryblokContent(storyblokProps);

            setLoading(false);
          });
        })
        .catch((error) => console.error(error));
    };

    const submitStory: MouseEventHandler<HTMLButtonElement> = async (ev) => {
      const blok = (ev.target as Element).closest("[data-blok-c]");
      const blokMetaString = blok?.getAttribute("data-blok-c");
      if (!blokMetaString)
        throw new Error("Could not find blok meta for prompter");

      const { uid: prompterUid, id: storyUid } = JSON.parse(blokMetaString);

      fetch("https://www.ruhmesmeile.com/api/import", {
        method: "POST",
        body: JSON.stringify({
          storyUid,
          prompterUid,
          page: {
            name: "Import",
            is_folder: false,
            content: storyblokContent,
            published: true,
            real_path: "/import",
            unpublished_changes: false,
            slug: "import",
            full_slug: "import",
            position: 0,
          },
        }),
      })
        .then((response) => {
          response.json().then((json) => {
            console.log("Story submitted successfully", json);
            setSubmitted(true);
          });
        })
        .catch((error) => console.error(error));
    };

    return (
      <div {...props} ref={ref} style={{ border: "5px solid cyan" }}>
        <Section
          width="default"
          spaceAfter="small"
          spaceBefore="default"
          content={{ mode: "list", width: "narrow" }}
          headline={{
            text: `🤖 Prompt content ✨`,
            width: "default",
            align: "left",
          }}
        >
          {!loading && !submitted && !idea && ideas && ideas.length > 0 && (
            <>
              <SelectField
                ref={ideaSelectRef}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                options={[
                  { label: "Choose Idea...", value: "", disabled: true },
                ].concat(
                  ideas.map((idea) => {
                    return {
                      value: idea.id,
                      label: idea.name,
                      disabled: false,
                    };
                  })
                )}
              />
            </>
          )}
          {idea && !loading && !generatedContent && (
            <>
              <Text
                text={`💡 **Selected**: ${
                  ideas.find((object) => object.id === idea)?.name
                }`}
              />
              <Button label="Generate Content" onClick={handleGenerate} />
            </>
          )}
          {storyblokContent && (
            <Button label="Submit Story" onClick={submitStory} />
          )}
        </Section>
        {loading && (
          <Section
            width="narrow"
            spaceAfter="small"
            spaceBefore="none"
            content={{ mode: "list", width: "narrow" }}
          >
            <div style={{ marginLeft: "auto", marginRight: "auto" }}>
              <InfinitySpin
                width="200"
                color="var(--ks-text-color-secondary)"
              />
            </div>
          </Section>
        )}
        {submitted && (
          <Section
            width="narrow"
            spaceAfter="small"
            spaceBefore="default"
            content={{ mode: "list", width: "narrow" }}
          >
            <Text text="Successfully submitted" />
            <Button label="Refresh page" />
          </Section>
        )}
        {generatedContent && !submitted && (
          <Page
            {...generatedContent}
            seo={{
              title: "TODO remove this, only added to satisfy typings for now",
            }}
          />
        )}
        {/* {generatedContent && (
        <Section width="full" spaceAfter="small" spaceBefore="none">
          <Html
            style={{ background: "white" }}
            html={`<pre><code>${JSON.stringify(
              generatedContent,
              null,
              2
            )}</code></pre>`}
          />
        </Section>
      )}
      {storyblokContent && (
        <Section width="full" spaceAfter="small" spaceBefore="none">
          <Html
            style={{ background: "white" }}
            html={`<pre><code>${JSON.stringify(
              storyblokContent,
              null,
              2
            )}</code></pre>`}
          />
        </Section>
      )} */}
      </div>
    );
  }
);
PrompterComponent.displayName = "Prompter Component";

// TODO:
//
// - add hints for removed fields to description, if applicable (e.g. `format: markdown` -> "this typically can include markdown formatting", `default` -> "..., typically set to 'value'")
// - collect used / removed fields, to clean up stories from API to use for additional context
// - merge result back to defaults of component
