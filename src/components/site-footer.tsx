import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-600">
        <p>
          <span className="font-semibold text-slate-800">Affiliate disclosure:</span> We may earn a commission when
          you purchase through links on this site. This helps us publish independent reviews at no extra cost to you.
        </p>
        <div className="flex items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Affiliate Compass. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-slate-800">
              About
            </Link>
            <Link href="/contact" className="hover:text-slate-800">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
