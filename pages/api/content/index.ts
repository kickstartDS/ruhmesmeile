import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import OpenAI from "openai";

const cors = Cors({
  methods: ["POST"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await runMiddleware(req, res, cors);

    try {
      const { system, prompt, schema } = JSON.parse(req.body);

      if (!system) return res.status(400).send({ error: "system is required" });
      if (!prompt) return res.status(400).send({ error: "prompt is required" });
      if (!schema) return res.status(400).send({ error: "schema is required" });

      const client = new OpenAI({ apiKey: process.env.NEXT_OPENAI_API_KEY });
      const result = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: system,
          },
          { role: "user", content: prompt },
        ],
        response_format: {
          type: "json_schema",
          json_schema: schema,
        },
        model: "gpt-4o-2024-08-06",
      });

      res.status(200).send({ content: result.choices[0].message.content });
    } catch (err) {
      res.status(500).send({ error: "failed", err });
    }
  } else {
    return res.status(405).send({ error: "method not allowed" });
  }
}
