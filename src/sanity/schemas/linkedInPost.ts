import { defineType, defineField } from "sanity";

export const linkedInPost = defineType({
  name: "linkedInPost",
  title: "LinkedIn Post",
  type: "document",
  fields: [
    defineField({
      name: "post_type",
      title: "Post Type",
      type: "string",
      options: {
        list: [
          { title: "Educational", value: "educational" },
          { title: "Showcase", value: "showcase" },
          { title: "Opinion", value: "opinion" },
          { title: "Engagement", value: "engagement" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hook",
      title: "Hook",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption_short",
      title: "Caption (Short)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption_long",
      title: "Caption (Long)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "design_style",
      title: "Design Style",
      type: "string",
    }),
    defineField({
      name: "image_prompts",
      title: "Image Prompts (Imagen 3 Options)",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(3).max(3),
    }),
    defineField({
      name: "hashtags",
      title: "Hashtags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "cta",
      title: "Call To Action (CTA)",
      type: "string",
    }),
    defineField({
      name: "target_platforms",
      title: "Target Platforms",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["linkedin"],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Selected", value: "selected" },
          { title: "Posted", value: "posted" },
        ],
      },
      initialValue: "pending",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "batch_date",
      title: "Batch Date",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
export default linkedInPost;
