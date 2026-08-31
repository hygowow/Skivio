import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Actionable buying guides and affiliate strategy insights for business operators.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-14">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Editorial</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Affiliate marketing and tool evaluation guides</h1>
      </header>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-slate-300"
          >
            <div className="relative h-52 bg-slate-100">
              <Image
                src={post.coverImage || "/images/blog/default-post.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-3 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {formatDate(post.publishedAt ?? post.createdAt)}
              </p>
              <h2 className="text-2xl font-semibold leading-tight text-slate-900">{post.title}</h2>
              <p className="text-sm leading-6 text-slate-600">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
