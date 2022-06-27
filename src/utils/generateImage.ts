import fetch from "node-fetch";
const GENERATE_IMG_URL = "https://backend.craiyon.com/generate";

interface BackendResponse {
  images: string[];
  version: string;
}

export interface GenerateImageResponse {
  images: Buffer[];
  version: string;
}

export async function generateImages(
  prompt: string
): Promise<GenerateImageResponse> {
  const res = await fetch(GENERATE_IMG_URL, {
    body: JSON.stringify({ prompt }),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = (await res.json()) as BackendResponse;
  const images = json.images
    .map((s) => s.replace(/\\n/g, ""))
    .map((s) => Buffer.from(s, "base64"));

  return {
    images,
    version: json.version,
  };
}
