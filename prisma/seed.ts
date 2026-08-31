import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const offers = [
  {
    title: "NordLayer Business VPN",
    slug: "nordlayer-business-vpn",
    description:
      "Secure remote team traffic with centralized controls, zero-trust access, and rapid onboarding.",
    imageUrl: "/images/offers/vpn-shield.svg",
    ctaText: "View Offer",
    affiliateUrl: "https://example.com/offers/nordlayer",
    featured: true,
  },
  {
    title: "HubSpot Starter CRM",
    slug: "hubspot-starter-crm",
    description:
      "Track leads, automate follow-ups, and improve conversion visibility without heavyweight setup.",
    imageUrl: "/images/offers/crm-growth.svg",
    ctaText: "Compare Plans",
    affiliateUrl: "https://example.com/offers/hubspot",
    featured: false,
  },
  {
    title: "QuickBooks Online Plus",
    slug: "quickbooks-online-plus",
    description:
      "Simplify bookkeeping, invoicing, and cash flow reporting with accountant-friendly workflows.",
    imageUrl: "/images/offers/finance-ops.svg",
    ctaText: "Start Free Trial",
    affiliateUrl: "https://example.com/offers/quickbooks",
    featured: false,
  },
];

const posts = [
  {
    title: "How to Evaluate Affiliate Tools Without Wasting Budget",
    slug: "evaluate-affiliate-tools-smartly",
    excerpt:
      "A practical framework for comparing software offers by ROI, onboarding friction, and long-term value.",
    coverImage: "/images/blog/tool-evaluation.svg",
    content: `Most teams lose budget when they pick tools based on hype instead of fit. Start with outcomes, not feature lists.

Define the operating problem first. Are you trying to improve pipeline visibility, reduce support overhead, or increase checkout completion? Once outcomes are clear, shortlist tools that map directly to those outcomes.

Use a weighted scorecard that includes implementation time, owner bandwidth, and measurable upside inside 90 days. This keeps evaluation grounded in execution, not marketing claims.

Finally, document your assumptions before purchase. Teams that write down success criteria are faster at deciding whether to expand or replace a tool after the initial rollout.`,
    published: true,
    publishedAt: new Date("2026-01-12T09:00:00Z"),
  },
  {
    title: "Affiliate Disclosure Best Practices for Trust-First Content",
    slug: "affiliate-disclosure-best-practices",
    excerpt:
      "Disclosure placement and language patterns that keep your audience informed without hurting conversion.",
    coverImage: "/images/blog/disclosure-practices.svg",
    content: `Disclosure is a trust signal, not a legal afterthought. Place it where decisions happen: near recommendation blocks and above conversion CTAs.

Use direct language. "We may earn a commission if you buy through our links" is clearer than vague legal jargon. Clear disclosure improves credibility and often improves qualified clicks.

Keep disclosures consistent across offers, comparison tables, and editorial content. Inconsistent disclosure creates uncertainty and can reduce long-term audience confidence.

Treat disclosures as part of product design. They should be readable, visible, and integrated into your brand voice.`,
    published: true,
    publishedAt: new Date("2026-02-06T11:30:00Z"),
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? "admin@local.dev";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: { passwordHash },
    create: { email: adminEmail.toLowerCase(), passwordHash },
  });

  for (const offer of offers) {
    await prisma.offer.upsert({
      where: { slug: offer.slug },
      update: offer,
      create: offer,
    });
  }

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log(`Seed complete. Admin login: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
