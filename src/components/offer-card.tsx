import Image from "next/image";

type OfferCardProps = {
  title: string;
  description: string;
  imageUrl?: string | null;
  ctaText: string;
  affiliateUrl: string;
  featured?: boolean;
};

export function OfferCard({ title, description, imageUrl, ctaText, affiliateUrl, featured = false }: OfferCardProps) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm ${
        featured ? "border-blue-300 ring-1 ring-blue-100" : "border-slate-200"
      }`}
    >
      <div className="relative h-44 w-full bg-slate-100">
        <Image src={imageUrl || "/images/offers/default-offer.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        {featured ? (
          <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Featured</span>
        ) : null}
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
          Disclosure: This is an affiliate link. We may receive a commission for qualified purchases.
        </p>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-auto inline-flex w-fit items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          {ctaText}
        </a>
      </div>
    </article>
  );
}
