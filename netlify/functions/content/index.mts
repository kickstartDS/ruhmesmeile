import OpenAI from "openai";

export default async (request: Request) => {
  const locationInput = new URL(request.url).searchParams.get("location");

  if (!locationInput) {
    return new Response("Where are you traveling to?");
  }

  const client = new OpenAI({ apiKey: Netlify.env.get("OPENAI_API_KEY") });

  const toolRunner = await client.beta.chat.completions.runTools({
    messages: [
      {
        role: "system",
        content:
          "You're a helpful travel agent informing the user what clothes they should pack. When deciding what clothes to offer, you will be informed of the travel destination. Ensure that the clothes are appropriate for the weather.",
      },
      { role: "user", content: `I'm traveling to "${locationInput}"` },
    ],
    tools: [
      {
        type: "function",
        function: {
          description: "gets the current weather",
          function: getWeather,
          parse: JSON.parse,
          parameters: {
            type: "object",
            properties: {
              location: { type: "string" },
            },
          },
        },
      },
    ],
    model: "gpt-4-turbo",
  });

  const suggestion = await toolRunner.finalContent();

  return new Response(suggestion);
};

// called automatically when the model believes it needs to get the weather
async function getWeather(args: { location: string }) {
  const { location } = args;
  // call weather API
  return { temperature: "98F", precipitation: "humid" }; // it's hot everywhere :)
}

export const config = {
  path: "/gpt/content",
};
