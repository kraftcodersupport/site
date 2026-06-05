import { defineType, defineField } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Strategy", value: "Strategy" },
          { title: "Engineering", value: "Engineering" },
          { title: "Delivery", value: "Delivery" },
          { title: "Leadership", value: "Leadership" },
          { title: "Case Studies", value: "Case Studies" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g. 5 min read",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "published",
      title: "Published Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Brief Description / Summary",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Markdown Content",
      type: "text",
      description: "Rich content of the blog post in Markdown format",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
