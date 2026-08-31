import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/offers", label: "Offers" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          Affiliate Compass
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-700">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="rounded-full border border-slate-300 px-4 py-2 text-slate-800 hover:border-slate-400"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
