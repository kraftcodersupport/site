import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2023-05-03";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function main() {
  try {
    const posts = await client.fetch(`*[_type == "linkedInPost"] | order(createdAt desc)[0..3]`);
    console.log("Recent posts in Sanity:");
    posts.forEach((p: any, idx: number) => {
      console.log(`\n--- Post ${idx + 1} (${p.post_type}) ---`);
      console.log(`Topic: ${p.topic}`);
      console.log(`Image Prompt: ${p.image_prompt}`);
      console.log(`Image URL: ${p.image_url}`);
    });
  } catch (err) {
    console.error("Error querying Sanity:", err);
  }
}

main();
