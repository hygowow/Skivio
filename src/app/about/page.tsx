import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how Affiliate Compass evaluates software offers and editorial recommendations.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-6 py-14">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">About us</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">A trust-first affiliate publication for operators</h1>
      </header>
      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-8 text-slate-700">
        <p>
          Affiliate Compass helps founders and operating teams evaluate software with less noise. We focus on the
          practical details that shape implementation success: onboarding effort, support quality, pricing integrity,
          and measurable outcomes.
        </p>
        <p>
          Our editorial process is independent. We may earn affiliate commissions, but monetization does not influence
          whether we recommend a product. Every recommendation includes context on who the tool is best for—and who
          should skip it.
        </p>
      </div>
    </div>
  );
}
