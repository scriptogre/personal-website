import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      href: z.string(),
      img: image(),
    }),
});

const clientsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/clients" }),
  schema: ({ image }) =>
    z.object({
      href: z.string(),
      img: image(),
    }),
});

const linksCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/links" }),
  schema: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("contact"),
      label: z.string(),
      value: z.string(),
      href: z.string(),
      icon: z.string(),
    }),
    z.object({
      type: z.literal("social"),
      label: z.string(),
      value: z.string(),
      href: z.string(),
      icon: z.string(),
    }),
  ]),
});

const blogsCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blogs" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      imageAlt: z.string(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      isNew: z.boolean().default(false),
    }),
});

export const collections = {
  projects: projectsCollection,
  clients: clientsCollection,
  links: linksCollection,
  blogs: blogsCollection,
};
