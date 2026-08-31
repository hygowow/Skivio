import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/offers", label: "Offers" },
  { href: "/admin/posts", label: "Posts" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="flex items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
