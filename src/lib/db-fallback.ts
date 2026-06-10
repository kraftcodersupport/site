import fs from "fs";
import path from "path";
import { sanityWriteClient } from "./sanity/client";

const MOCK_DB_PATH = path.join(process.cwd(), "src/lib/mock-linkedin-posts.json");

// Ensure folder exists
const ensureDir = () => {
  const dir = path.dirname(MOCK_DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Simple in-memory fallback helper (used if Sanity is not configured or fails)
const getLocalPosts = (): any[] => {
  ensureDir();
  if (!fs.existsSync(MOCK_DB_PATH)) {
    return [];
  }
  try {
    const data = fs.readFileSync(MOCK_DB_PATH, "utf-8");
    const posts = JSON.parse(data);
    
    // Auto-filter: Only show posts from the last 48 hours to preserve campaign fresh state
    const now = Date.now();
    const activePosts = posts.filter((p: any) => {
      const createdAt = new Date(p.createdAt).getTime();
      return now - createdAt < 48 * 60 * 60 * 1000;
    });
    
    if (activePosts.length !== posts.length) {
      fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(activePosts, null, 2), "utf-8");
    }
    return activePosts;
  } catch (e) {
    console.error("Error reading local post fallback database:", e);
    return [];
  }
};

const saveLocalPosts = (posts: any[]) => {
  ensureDir();
  try {
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(posts, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing local post fallback database:", e);
  }
};

export async function getPosts(): Promise<any[]> {
  if (!sanityWriteClient) {
    console.warn("Sanity write client not configured. Falling back to local JSON database.");
    return getLocalPosts().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  try {
    // Retrieve LinkedIn posts active within 48 hours from Sanity
    const threshold = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
    const query = `*[_type == "linkedInPost" && createdAt >= $threshold] | order(createdAt desc)`;
    return await sanityWriteClient.fetch(query, { threshold });
  } catch (sanityError) {
    console.warn("Sanity fetch failed. Falling back to local JSON database:", sanityError);
    return getLocalPosts().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export async function createPost(postData: any): Promise<any> {
  const createdAt = postData.createdAt || new Date().toISOString();
  
  if (!sanityWriteClient) {
    console.warn("Sanity write client not configured. Storing post locally.");
    const localPosts = getLocalPosts();
    const newPost = {
      _id: `local_${Math.random().toString(36).substr(2, 9)}`,
      ...postData,
      createdAt,
      updatedAt: new Date().toISOString(),
    };
    localPosts.push(newPost);
    saveLocalPosts(localPosts);
    return newPost;
  }

  try {
    const doc = {
      _type: "linkedInPost",
      ...postData,
      createdAt,
    };
    return await sanityWriteClient.create(doc);
  } catch (sanityError) {
    console.warn("Sanity create failed. Storing post locally:", sanityError);
    const localPosts = getLocalPosts();
    const newPost = {
      _id: `local_${Math.random().toString(36).substr(2, 9)}`,
      ...postData,
      createdAt,
      updatedAt: new Date().toISOString(),
    };
    localPosts.push(newPost);
    saveLocalPosts(localPosts);
    return newPost;
  }
}

export async function updatePost(id: string, updateData: any): Promise<any> {
  if (!sanityWriteClient || id.startsWith("local_")) {
    console.warn("Updating post in local JSON database.");
    const localPosts = getLocalPosts();
    const index = localPosts.findIndex((p) => p._id === id);
    if (index !== -1) {
      localPosts[index] = {
        ...localPosts[index],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      saveLocalPosts(localPosts);
      return localPosts[index];
    }
    throw new Error("Post not found in local database");
  }

  try {
    const patch = sanityWriteClient.patch(id);
    return await patch.set(updateData).commit();
  } catch (sanityError) {
    console.warn("Sanity update failed. Modifying local JSON database:", sanityError);
    const localPosts = getLocalPosts();
    const index = localPosts.findIndex((p) => p._id === id);
    if (index !== -1) {
      localPosts[index] = {
        ...localPosts[index],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      saveLocalPosts(localPosts);
      return localPosts[index];
    }
    throw new Error("Post not found in local database");
  }
}

export async function deletePostDocument(id: string): Promise<boolean> {
  if (!sanityWriteClient || id.startsWith("local_")) {
    console.warn("Deleting post from local JSON database.");
    const localPosts = getLocalPosts();
    const filtered = localPosts.filter((p) => p._id !== id);
    if (filtered.length !== localPosts.length) {
      saveLocalPosts(filtered);
      return true;
    }
    return false;
  }

  try {
    await sanityWriteClient.delete(id);
    return true;
  } catch (sanityError) {
    console.warn("Sanity delete failed. Removing from local JSON database:", sanityError);
    const localPosts = getLocalPosts();
    const filtered = localPosts.filter((p) => p._id !== id);
    if (filtered.length !== localPosts.length) {
      saveLocalPosts(filtered);
      return true;
    }
    return false;
  }
}
