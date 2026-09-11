import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const findings = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/findings',
  }),
  schema: z.object({
    title: z.string(),
    lede: z.string(),
    severity: z.enum(['Critical', 'High', 'Medium', 'Low']),
    series: z.enum(['microsoft', 'cloudflare', 'obyte', 'gvisor', 'tink', 'polygon', 'audit']),
    product: z.string(),
    target: z.string(),
    component: z.string(),
    reach: z.string(),
    date: z.coerce.date(),
    commit: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { findings };
