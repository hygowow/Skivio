import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the Affiliate Compass editorial team for partnership and editorial inquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-6 py-14">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Get in touch with our editorial team</h1>
      </header>
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <form className="space-y-5" action="mailto:editor@affiliatecompass.dev" method="post" encType="text/plain">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Send inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
