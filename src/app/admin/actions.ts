"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { postSchema, offerSchema } from "@/lib/validation";

const requireAdmin = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/admin/login");
  }
  return session;
};

const getString = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

const getBoolean = (value: FormDataEntryValue | null) => value === "on";

export async function createOfferAction(formData: FormData) {
  await requireAdmin();

  const parsed = offerSchema.parse({
    title: getString(formData.get("title")),
    slug: getString(formData.get("slug")),
    description: getString(formData.get("description")),
    imageUrl: getString(formData.get("imageUrl")),
    ctaText: getString(formData.get("ctaText")),
    affiliateUrl: getString(formData.get("affiliateUrl")),
    featured: getBoolean(formData.get("featured")),
  });

  await prisma.offer.create({
    data: {
      ...parsed,
      imageUrl: parsed.imageUrl || null,
    },
  });

  revalidatePath("/offers");
  revalidatePath("/admin/offers");
}

export async function updateOfferAction(id: string, formData: FormData) {
  await requireAdmin();

  const parsed = offerSchema.parse({
    title: getString(formData.get("title")),
    slug: getString(formData.get("slug")),
    description: getString(formData.get("description")),
    imageUrl: getString(formData.get("imageUrl")),
    ctaText: getString(formData.get("ctaText")),
    affiliateUrl: getString(formData.get("affiliateUrl")),
    featured: getBoolean(formData.get("featured")),
  });

  await prisma.offer.update({
    where: { id },
    data: {
      ...parsed,
      imageUrl: parsed.imageUrl || null,
    },
  });

  revalidatePath("/offers");
  revalidatePath("/admin/offers");
  redirect("/admin/offers");
}

export async function deleteOfferAction(id: string) {
  await requireAdmin();

  await prisma.offer.delete({ where: { id } });

  revalidatePath("/offers");
  revalidatePath("/admin/offers");
}

export async function createPostAction(formData: FormData) {
  await requireAdmin();

  const parsed = postSchema.parse({
    title: getString(formData.get("title")),
    slug: getString(formData.get("slug")),
    excerpt: getString(formData.get("excerpt")),
    coverImage: getString(formData.get("coverImage")),
    content: getString(formData.get("content")),
    published: getBoolean(formData.get("published")),
  });

  await prisma.post.create({
    data: {
      ...parsed,
      coverImage: parsed.coverImage || null,
      publishedAt: parsed.published ? new Date() : null,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
}

export async function updatePostAction(id: string, formData: FormData) {
  await requireAdmin();

  const parsed = postSchema.parse({
    title: getString(formData.get("title")),
    slug: getString(formData.get("slug")),
    excerpt: getString(formData.get("excerpt")),
    coverImage: getString(formData.get("coverImage")),
    content: getString(formData.get("content")),
    published: getBoolean(formData.get("published")),
  });

  const existing = await prisma.post.findUnique({ where: { id }, select: { publishedAt: true } });

  await prisma.post.update({
    where: { id },
    data: {
      ...parsed,
      coverImage: parsed.coverImage || null,
      publishedAt: parsed.published ? existing?.publishedAt ?? new Date() : null,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePostAction(id: string) {
  await requireAdmin();

  await prisma.post.delete({ where: { id } });

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
}
