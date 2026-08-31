import type { Metadata } from "next";

import { OfferCard } from "@/components/offer-card";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Offers",
  description: "Curated affiliate offers with transparent disclosures and practical buyer guidance.",
};

export const dynamic = "force-dynamic";

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }] });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-14">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Affiliate offers</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Recommended tools for growth-focused teams</h1>
        <p className="max-w-3xl text-slate-600">
          Every offer below is evaluated for implementation quality and operational value. We may earn commissions for
          purchases made through these links.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <OfferCard key={offer.id} {...offer} />
        ))}
      </div>
    </div>
  );
}
