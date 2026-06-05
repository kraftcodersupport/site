import { createClient } from "@sanity/client";
import { 
  TESTIMONIALS, 
  TEAM_MEMBERS, 
  BLOG_POSTS 
} from "@/lib/niches";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2023-05-03";

export const isSanityConfigured = !!projectId;

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

// Write Client for auto-blog generation
export const sanityWriteClient = isSanityConfigured && process.env.SANITY_API_WRITE_TOKEN
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_WRITE_TOKEN,
    })
  : null;

// Fetch wrapper with fallback to niches.ts local data
export async function getSanityTestimonials(): Promise<any[]> {
  if (!isSanityConfigured || !sanityClient) {
    return TESTIMONIALS;
  }
  try {
    const query = `*[_type == "testimonial"] | order(_createdAt desc) {
      author,
      "imageUrl": image.asset->url,
      role,
      company,
      quote,
      rating
    }`;
    const data = await sanityClient.fetch(query);
    return data.length > 0 ? data : TESTIMONIALS;
  } catch (error) {
    console.error("Failed to fetch testimonials from Sanity:", error);
    return TESTIMONIALS;
  }
}

export async function getSanityTeamMembers(): Promise<any[]> {
  if (!isSanityConfigured || !sanityClient) {
    return TEAM_MEMBERS;
  }
  try {
    const query = `*[_type == "teamMember"] | order(order asc) {
      name,
      "imageUrl": image.asset->url,
      role,
      bio,
      portfolioUrl,
      order
    }`;
    const data = await sanityClient.fetch(query);
    return data.length > 0 ? data : TEAM_MEMBERS;
  } catch (error) {
    console.error("Failed to fetch team members from Sanity:", error);
    return TEAM_MEMBERS;
  }
}

export async function getSanityBlogPosts(): Promise<any[]> {
  if (!isSanityConfigured || !sanityClient) {
    return BLOG_POSTS;
  }
  try {
    const query = `*[_type == "blogPost"] | order(published desc) {
      title,
      category,
      readTime,
      published,
      description,
      content,
      slug
    }`;
    const data = await sanityClient.fetch(query);
    return data.length > 0 ? data : BLOG_POSTS;
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity:", error);
    return BLOG_POSTS;
  }
}

export async function getSanityBlogPostBySlug(slug: string): Promise<any> {
  const normalizeLocalSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  if (!isSanityConfigured || !sanityClient) {
    return BLOG_POSTS.find(
      (post) =>
        normalizeLocalSlug(post.title) === slug ||
        post.title.toLowerCase().replace(/ /g, "-") === slug
    );
  }
  try {
    // Query by slug.current or fallback to matching the title normalized
    const query = `*[_type == "blogPost" && (slug.current == $slug || title match $slugTitle)][0] {
      title,
      category,
      readTime,
      published,
      description,
      content,
      slug
    }`;
    const slugTitle = slug.replace(/-/g, " ");
    const data = await sanityClient.fetch(query, { slug, slugTitle });
    
    if (data) return data;
    
    // Local fallback if no data in Sanity
    return BLOG_POSTS.find(
      (post) =>
        normalizeLocalSlug(post.title) === slug ||
        post.title.toLowerCase().replace(/ /g, "-") === slug
    );
  } catch (error) {
    console.error("Failed to fetch single blog post from Sanity:", error);
    return BLOG_POSTS.find(
      (post) =>
        normalizeLocalSlug(post.title) === slug ||
        post.title.toLowerCase().replace(/ /g, "-") === slug
    );
  }
}

