import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const manifestations = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/manifestations",
  }),

  schema: z.object({
    title: z.string(),

    type: z.enum(["repas", "randonnee", "réunion", "autre"]),

    date: z.coerce.date(),

    startTime: z.string().optional(),

    endTime: z.string().optional(),

    location: z.object({
      name: z.string(),
      address: z.string().optional(),
      postalCode: z.string().optional(),
      city: z.string(),
    }),

    description: z.string(),

    image: z.string().optional(),

    contact: z
      .object({
        email: z.string().email().optional(),
        phone: z.string().optional(),
      })
      .optional(),

    registration: z.object({
      url: z.string().url().optional(),
      deadline: z.coerce.date().optional(),
    })
	.optional(),

    prices: z
      .array(
        z.object({
          label: z.string(),
          amount: z.number().nonnegative(),
          description: z.string().optional(),
        }),
      )
      .optional(),

    status: z
      .enum(["draft", "open", "closed", "full", "finished"])
      .default("draft"),

    featured: z.boolean().default(false),
  }),
});

export const collections = {
  manifestations,
};