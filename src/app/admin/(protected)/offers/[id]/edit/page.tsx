import { notFound } from "next/navigation";

import { updateOfferAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Edit Offer",
};

type Params = { id: string };

export const dynamic = "force-dynamic";

export default async function EditOfferPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const offer = await prisma.offer.findUnique({ where: { id } });

  if (!offer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Edit offer</h1>
      <form action={updateOfferAction.bind(null, offer.id)} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <LabeledInput label="Title" name="title" required defaultValue={offer.title} />
        <LabeledInput label="Slug" name="slug" required defaultValue={offer.slug} />
        <LabeledInput label="CTA Text" name="ctaText" required defaultValue={offer.ctaText} />
        <LabeledInput label="Affiliate URL" name="affiliateUrl" type="url" required defaultValue={offer.affiliateUrl} />
        <LabeledInput label="Image URL" name="imageUrl" defaultValue={offer.imageUrl || ""} />
        <label className="flex items-center gap-2 text-sm text-slate-700 md:pt-7">
          <input type="checkbox" name="featured" className="h-4 w-4" defaultChecked={offer.featured} /> Featured
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-700">Description</span>
          <textarea
            name="description"
            required
            rows={5}
            defaultValue={offer.description}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </label>
        <button type="submit" className="w-fit rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
          Update offer
        </button>
      </form>
    </div>
  );
}

function LabeledInput({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
      />
    </label>
  );
}
