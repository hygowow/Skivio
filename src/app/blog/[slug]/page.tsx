import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: { slug, published: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-14">
      <div className="relative mb-8 h-72 overflow-hidden rounded-3xl bg-slate-100">
        <Image
          src={post.coverImage || "/images/blog/default-post.svg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {formatDate(post.publishedAt ?? post.createdAt)}
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-900">{post.title}</h1>
      <p className="mt-3 text-lg text-slate-600">{post.excerpt}</p>
      <div className="mt-10 space-y-5 text-base leading-8 text-slate-700">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
