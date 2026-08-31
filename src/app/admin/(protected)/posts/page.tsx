import Link from "next/link";

import { createPostAction, deletePostAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Manage Posts",
};

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-slate-900">Manage posts</h1>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Create post</h2>
        <form action={createPostAction} className="mt-4 grid gap-4 md:grid-cols-2">
          <LabeledInput label="Title" name="title" required />
          <LabeledInput label="Slug" name="slug" required />
          <LabeledInput label="Cover image URL" name="coverImage" placeholder="/images/blog/default-post.svg" />
          <label className="flex items-center gap-2 text-sm text-slate-700 md:pt-7">
            <input type="checkbox" name="published" className="h-4 w-4" /> Published
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Excerpt</span>
            <textarea
              name="excerpt"
              required
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Content</span>
            <textarea
              name="content"
              required
              rows={8}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </label>
          <button type="submit" className="w-fit rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
            Save post
          </button>
        </form>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{post.title}</td>
                <td className="px-4 py-3 text-slate-600">{post.slug}</td>
                <td className="px-4 py-3">{post.published ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      Edit
                    </Link>
                    <form action={deletePostAction.bind(null, post.id)}>
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
