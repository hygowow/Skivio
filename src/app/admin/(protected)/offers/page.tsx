import Link from "next/link";

import { createOfferAction, deleteOfferAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Manage Offers",
};

export const dynamic = "force-dynamic";

export default async function AdminOffersPage() {
  const offers = await prisma.offer.findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }] });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-slate-900">Manage offers</h1>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Create offer</h2>
        <form action={createOfferAction} className="mt-4 grid gap-4 md:grid-cols-2">
          <LabeledInput label="Title" name="title" required />
          <LabeledInput label="Slug" name="slug" required />
          <LabeledInput label="CTA Text" name="ctaText" required />
          <LabeledInput label="Affiliate URL" name="affiliateUrl" type="url" required />
          <LabeledInput label="Image URL" name="imageUrl" placeholder="/images/offers/default-offer.svg" />
          <label className="flex items-center gap-2 text-sm text-slate-700 md:pt-7">
            <input type="checkbox" name="featured" className="h-4 w-4" /> Featured
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Description</span>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </label>
          <button type="submit" className="w-fit rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
            Save offer
          </button>
        </form>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{offer.title}</td>
                <td className="px-4 py-3 text-slate-600">{offer.slug}</td>
                <td className="px-4 py-3">{offer.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/offers/${offer.id}/edit`}
                      className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      Edit
                    </Link>
                    <form action={deleteOfferAction.bind(null, offer.id)}>
                      <button
                        type="submit"
                        className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-700"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function LabeledInput({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
      />
    </label>
  );
}
