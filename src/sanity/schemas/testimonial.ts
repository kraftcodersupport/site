import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Author Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "role",
      title: "Role / Designation",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote Content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
});
