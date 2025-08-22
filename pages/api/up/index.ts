import { NextApiRequest, NextApiResponse } from "next";
import StoryblokClient from "storyblok-js-client";
import Cors from "cors";

const cors = Cors({
  methods: ["GET"],
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
  if (req.method === "GET") {
    await runMiddleware(req, res, cors);

    return res.status(200).send("Ok");
  } else {
    return res.status(405).send({ error: "method not allowed" });
  }
}
