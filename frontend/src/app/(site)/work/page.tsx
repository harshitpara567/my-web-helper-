import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { portfolioProjects } from "@/lib/seed/portfolio";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Browse our portfolio of web, mobile, e-commerce, custom software and enterprise platforms delivered for ambitious brands.",
  alternates: { canonical: "/work" }
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="A portfolio built on outcomes."
        description="Selected products, platforms and storefronts we've shipped — filter by category to see the work closest to your challenge."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Work" }]}
      />
      <WorkGrid projects={portfolioProjects} />
    </>
  );
}
