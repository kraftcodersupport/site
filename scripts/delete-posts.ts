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
    const posts = await client.fetch(`*[_type == "linkedInPost"]`);
    console.log(`Found ${posts.length} posts to delete.`);
    for (const p of posts) {
      if (p.sanity_image_id) {
        try {
          await client.delete(p.sanity_image_id);
        } catch (e) {}
      }
      await client.delete(p._id);
      console.log(`Deleted post: ${p.topic}`);
    }
    console.log("Cleanup complete!");
  } catch (err) {
    console.error("Error cleaning up Sanity:", err);
  }
}

main();
