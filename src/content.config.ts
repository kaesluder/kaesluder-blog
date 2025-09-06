// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `loader` and `schema` for each collection
const blog = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.md",
		base: "./src/content/blog",
	}),
	schema: z.object({
		title: z.string(),
		date: z.string().transform((str) => new Date(str)),
		draft: z.boolean().optional().default(false),
		tags: z.array(z.string()).optional().default([]),
		mermaid: z.boolean().optional().default(false),
		description: z.string().optional(),
		author: z.string().optional(),
		image: z
			.object({
				url: z.string(),
				alt: z.string(),
			})
			.optional(),
	}),
});

// Export a single `collections` object to register your collection(s)
export const collections = { blog };
