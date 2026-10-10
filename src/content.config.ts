import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const yaml = (dir: string) =>
  glob({ pattern: "*.yaml", base: `./src/content/${dir}` });
const markdown = (dir: string) =>
  glob({ pattern: "*.md", base: `./src/content/${dir}` });

export const collections = {
  apps: defineCollection({
    loader: yaml("apps"),
    schema: ({ image }) =>
      z.object({
        name: z.string().min(1),
        logo: image(),
        type: z.string().min(1),
        deploymentUrl: z.url().optional(),
        githubUrl: z.url(),
      }),
  }),
  companies: defineCollection({
    loader: yaml("companies"),
    schema: ({ image }) =>
      z.object({
        name: z.string().min(1),
        logo: image(),
      }),
  }),
  education: defineCollection({
    loader: markdown("education"),
    schema: z.object({
      degree: z.string().min(1),
      school: reference("schools"),
      displayDate: z.string().min(1),
      sort: z.number(),
    }),
  }),
  experience: defineCollection({
    loader: markdown("experience"),
    schema: z.object({
      title: z.string().min(1),
      company: reference("companies"),
      displayDate: z.string().min(1),
      technologies: z.array(reference("technologies")),
      sort: z.number(),
    }),
  }),
  info: defineCollection({
    loader: markdown("info"),
    schema: z.object({
      title: z.string().min(1),
    }),
  }),
  projects: defineCollection({
    loader: markdown("projects"),
    schema: z.object({
      app: reference("apps"),
      technologies: z.array(reference("technologies")),
      sort: z.number(),
    }),
  }),
  schools: defineCollection({
    loader: yaml("schools"),
    schema: ({ image }) =>
      z.object({
        name: z.string().min(1),
        logo: image(),
      }),
  }),
  skills: defineCollection({
    loader: markdown("skills"),
    schema: z.object({
      technologies: z.array(reference("technologies")),
      sort: z.number(),
    }),
  }),
  technologies: defineCollection({
    loader: yaml("technologies"),
    schema: z.object({
      name: z.string().min(1),
      icon: z.string().min(1),
      url: z.url(),
    }),
  }),
};
