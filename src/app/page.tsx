import Link from "next/link";

import { OfferCard } from "@/components/offer-card";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [offers, posts] = await Promise.all([
    prisma.offer.findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }], take: 3 }),
    prisma.post.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" }, take: 2 }),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-14">
      <section className="grid gap-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-white md:grid-cols-2 md:p-14">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Independent recommendations</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Choose affiliate-backed tools with confidence, not guesswork.
          </h1>
          <p className="max-w-xl text-lg text-slate-200">
            We review software with a practical operator lens—pricing clarity, implementation risk, and long-term fit.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/offers"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-blue-50"
            >
              Explore Offers
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-white/50 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Read the Blog
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
          <p className="text-sm font-semibold text-blue-100">Why teams trust Affiliate Compass</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li>• Practical scoring framework focused on real implementation outcomes.</li>
            <li>• Transparent disclosures and clear recommendation criteria.</li>
            <li>• Editorial updates when product quality or pricing materially changes.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Featured offers</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">High-confidence picks for growing teams</h2>
          </div>
          <Link href="/offers" className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline">
            View all offers
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.id} {...offer} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Proof over promises</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            We prioritize documented product quality, onboarding reality, and support responsiveness over vanity claims.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Audience-first methodology</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Every recommendation includes caveats, best-fit context, and alternatives so readers can make informed decisions.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Clear disclosure standards</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            We disclose affiliate relationships near calls-to-action and never hide monetization terms.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Latest articles</h2>
          <Link href="/blog" className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline">
            Browse blog
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {formatDate(post.publishedAt ?? post.createdAt)}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{post.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
