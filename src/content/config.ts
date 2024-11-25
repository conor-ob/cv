import { projects } from "@data/sections/projects";
import { z, defineCollection, reference } from "astro:content";

export const collections = {
  apps: defineCollection({
    type: "data",
    schema: ({ image }) =>
      z.object({
        name: z.string().min(1),
        logo: image(),
        type: z.string().min(1),
        deploymentUrl: z.string().url().optional(),
        githubUrl: z.string().min(1).url(),
      }),
  }),
  companies: defineCollection({
    type: "data",
    schema: ({ image }) =>
      z.object({
        name: z.string().min(1),
        logo: image(),
      }),
  }),
  education: defineCollection({
    type: "content",
    schema: z.object({
      degree: z.string().min(1),
      school: reference("schools"),
      displayDate: z.string().min(1),
      sort: z.number(),
    }),
  }),
  experience: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string().min(1),
      company: reference("companies"),
      displayDate: z.string().min(1),
      sort: z.number(),
    }),
  }),
  projects: defineCollection({
    type: "content",
    schema: z.object({
      app: reference("apps"),
      sort: z.number(),
    }),
  }),
  schools: defineCollection({
    type: "data",
    schema: ({ image }) =>
      z.object({
        name: z.string().min(1),
        logo: image(),
      }),
  }),
};
