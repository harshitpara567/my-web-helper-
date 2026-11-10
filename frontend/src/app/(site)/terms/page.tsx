import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing your use of the My Web Helper website and our provision of digital services.",
  alternates: { canonical: "/terms" }
};

const lastUpdated = "10 November 2026";

const sections: { id: string; heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    id: "acceptance",
    heading: "1. Acceptance of Terms",
    paragraphs: [
      `These Terms & Conditions ("Terms") govern your access to and use of the My Web Helper website and any services we provide. By accessing the site or engaging our services, you agree to be bound by these Terms.`,
      "If you are entering into these Terms on behalf of a company or other legal entity, you confirm that you have the authority to bind that entity."
    ]
  },
  {
    id: "use-of-website",
    heading: "2. Use of Our Website",
    paragraphs: [
      "You may use our website for lawful purposes only. You agree not to:"
    ],
    list: [
      "Use the site in any way that breaches applicable laws or regulations.",
      "Attempt to gain unauthorised access to the site, its servers or connected systems.",
      "Interfere with or disrupt the site, or introduce viruses or other harmful code.",
      "Copy, reproduce or exploit any part of the site for commercial purposes without our written permission.",
      "Misrepresent your identity or affiliation with any person or organisation."
    ]
  },
  {
    id: "intellectual-property",
    heading: "3. Intellectual Property",
    paragraphs: [
      "All content on this website — including text, graphics, logos, designs and code — is owned by or licensed to My Web Helper and is protected by applicable intellectual property laws. You may not use our trademarks or content without prior written consent.",
      "Intellectual property created during a client engagement is governed by the applicable client agreement. Unless agreed otherwise, deliverables transfer to the client upon receipt of final payment."
    ]
  },
  {
    id: "client-engagements",
    heading: "4. Client Engagements",
    paragraphs: [
      "Services are provided under a separate written proposal or statement of work that sets out scope, deliverables, timelines and fees. These Terms apply in addition to, and do not replace, any such agreement.",
      "Where a conflict exists between these Terms and a signed client agreement, the signed client agreement prevails."
    ]
  },
  {
    id: "payments",
    heading: "5. Payments",
    paragraphs: [
      "Fees, payment schedules and invoicing terms are set out in the applicable proposal or statement of work. Unless stated otherwise, invoices are payable within the period specified on the invoice.",
      "Late payments may incur interest and may result in suspension of services. Fees are exclusive of applicable taxes, which are charged in addition where required."
    ]
  },
  {
    id: "warranties-disclaimers",
    heading: "6. Warranties & Disclaimers",
    paragraphs: [
      "We provide our services with reasonable skill and care and in accordance with applicable professional standards. We warrant that deliverables will materially conform to the agreed specification for the stated warranty period, if any.",
      "Except as expressly stated, the website and services are provided &ldquo;as is&rdquo; without warranties of any kind, whether express or implied, including fitness for a particular purpose. We do not warrant that the site will be uninterrupted, error-free or free of harmful components."
    ]
  },
  {
    id: "limitation-of-liability",
    heading: "7. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, My Web Helper shall not be liable for any indirect, incidental, special or consequential losses, or for loss of profits, data, revenue or goodwill, arising out of or in connection with the use of our website or services.",
      "Our total aggregate liability arising from any engagement shall not exceed the total fees paid by you for the services giving rise to the claim."
    ]
  },
  {
    id: "termination",
    heading: "8. Termination",
    paragraphs: [
      "We may suspend or terminate your access to the website at any time if you breach these Terms. Termination of a client engagement is governed by the applicable client agreement.",
      "Provisions that by their nature should survive termination — including intellectual property, disclaimers, limitation of liability and governing law — will continue to apply."
    ]
  },
  {
    id: "governing-law",
    heading: "9. Governing Law",
    paragraphs: [
      "These Terms are governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles. The courts located in San Francisco, California shall have exclusive jurisdiction over any dispute arising from these Terms."
    ]
  },
  {
    id: "changes",
    heading: "10. Changes to These Terms",
    paragraphs: [
      "We may revise these Terms from time to time to reflect changes in our services or legal requirements. The updated version will take effect when published on this page, and we will revise the “Last updated” date above."
    ]
  },
  {
    id: "contact",
    heading: "11. Contact",
    paragraphs: ["If you have any questions about these Terms, please contact us at the details below."],
    list: [`Email: ${siteConfig.email}`, `Phone: ${siteConfig.phone}`, `Address: ${siteConfig.address}`]
  }
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Please read these terms carefully. They govern your use of our website and the digital services we provide."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />

      <section className="shell py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-ink/55">Last updated: {lastUpdated}</p>

          <nav aria-label="Table of contents" className="mt-8 rounded-2xl border border-ink/10 bg-paper-soft p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">On this page</h2>
            <ol className="mt-4 space-y-2 text-sm">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-ink/70 underline-offset-4 transition-colors hover:text-brand-600 hover:underline"
                  >
                    {`${index + 1}. ${section.heading.replace(/^\d+\.\s*/, "")}`}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="prose-editorial mt-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
