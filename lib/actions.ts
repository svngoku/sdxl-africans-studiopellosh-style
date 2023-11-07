"use server";
import Replicate from "replicate";
import { kv } from "@vercel/kv";
import { nanoid } from "./utils";
import { DEFAULT_PATTERN, WEBHOOK_URL } from "./constants";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

function wait(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generate(form: FormData) {
  const prompt = form.get("prompt") as string;
  const id = nanoid();

  // Store the prompt in KV store and initiate the prediction
  const storePromise = kv.hset(id, { prompt });
  const res = await Promise.all([
    kv.hset(id, {
      prompt,
    }),
    replicate.predictions.create({
      version:
        "052925cac816ec9dc40a3adee633dacd90a32a8fc7db629ea0d056da9ab2b374",
      input: {
        prompt,
      }
    }),
  ]);
   // Wait for both the store and predict operations, as well as an additional delay
   await Promise.all([storePromise, res]);
   // Wait for an additional 20 seconds after the operations are complete
   console.log("Prediction complete", res);
   return id;
}

