import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin Dashboard",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [offerCount, postCount] = await Promise.all([prisma.offer.count(), prisma.post.count()]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-medium text-slate-500">Offers</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{offerCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-medium text-slate-500">Posts</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{postCount}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Link href="/admin/offers" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
          Manage offers
        </Link>
        <Link href="/admin/posts" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">
          Manage posts
        </Link>
      </div>
    </div>
  );
}
