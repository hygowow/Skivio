import type { Metadata } from "next";

import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Affiliate Compass | Trusted Software Recommendations",
    template: "%s | Affiliate Compass",
  },
  description:
    "Professional affiliate insights for founders and operators who want trusted software recommendations and implementation guidance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
