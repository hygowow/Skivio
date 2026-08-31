import { notFound } from "next/navigation";

import { updatePostAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Edit Post",
};

type Params = { id: string };

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Edit post</h1>
      <form action={updatePostAction.bind(null, post.id)} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <LabeledInput label="Title" name="title" required defaultValue={post.title} />
        <LabeledInput label="Slug" name="slug" required defaultValue={post.slug} />
        <LabeledInput label="Cover image URL" name="coverImage" defaultValue={post.coverImage || ""} />
        <label className="flex items-center gap-2 text-sm text-slate-700 md:pt-7">
          <input type="checkbox" name="published" className="h-4 w-4" defaultChecked={post.published} /> Published
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-700">Excerpt</span>
          <textarea
            name="excerpt"
            required
            rows={3}
            defaultValue={post.excerpt}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-700">Content</span>
          <textarea
            name="content"
            required
            rows={12}
            defaultValue={post.content}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </label>
        <button type="submit" className="w-fit rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
          Update post
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
