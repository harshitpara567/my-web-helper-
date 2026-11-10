import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { Intro } from "@/components/home/Intro";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { SuccessStories } from "@/components/home/SuccessStories";
import { Technologies } from "@/components/home/Technologies";
import { StatsBand } from "@/components/home/StatsBand";
import { LatestInsights } from "@/components/home/LatestInsights";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/shared/CTASection";
import { getBlogs, getTestimonials } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Premium Digital Agency",
  description: siteConfig.description,
  alternates: { canonical: "/" }
};

export default async function HomePage() {
  const [blogs, testimonials] = await Promise.all([getBlogs(), getTestimonials()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94105",
      addressCountry: "US"
    },
    sameAs: siteConfig.socials.map((social) => social.href)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ClientsMarquee />
      <Intro />
      <ServicesGrid />
      <WhyChooseUs />
      <FeaturedWork />
      <SuccessStories />
      <Technologies />
      <StatsBand />
      <LatestInsights posts={blogs} />
      <Testimonials items={testimonials} />
      <CTASection />
    </>
  );
}
