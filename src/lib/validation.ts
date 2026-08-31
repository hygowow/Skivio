import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const loginSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase().trim()),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const offerSchema = z.object({
  title: z.string().min(3).max(120),
  slug: z.string().regex(slugPattern, "Use lowercase letters, numbers, and hyphens."),
  description: z.string().min(20).max(320),
  imageUrl: z.string().trim().optional().or(z.literal("")),
  ctaText: z.string().min(2).max(40),
  affiliateUrl: z
    .string()
    .url()
    .refine((value) => value.startsWith("http"), "Provide a valid URL."),
  featured: z.boolean().default(false),
});

export const postSchema = z.object({
  title: z.string().min(5).max(160),
  slug: z.string().regex(slugPattern, "Use lowercase letters, numbers, and hyphens."),
  excerpt: z.string().min(20).max(220),
  coverImage: z.string().trim().optional().or(z.literal("")),
  content: z.string().min(80),
  published: z.boolean().default(false),
});

export type OfferInput = z.infer<typeof offerSchema>;
export type PostInput = z.infer<typeof postSchema>;
