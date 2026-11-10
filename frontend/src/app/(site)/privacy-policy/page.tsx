import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How My Web Helper collects, uses, stores and protects personal information, and the rights available to you.",
  alternates: { canonical: "/privacy-policy" }
};

const lastUpdated = "10 November 2026";

const sections: { id: string; heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    id: "introduction",
    heading: "1. Introduction",
    paragraphs: [
      `My Web Helper ("we", "us", "our") operates this website and provides digital design, engineering and consulting services. This Privacy Policy explains how we collect, use, share and protect personal information when you visit our website, contact us or engage us for services.`,
      "By using our website you consent to the practices described in this policy. If you do not agree with any part of it, please discontinue use of the site."
    ]
  },
  {
    id: "information-we-collect",
    heading: "2. Information We Collect",
    paragraphs: [
      "We collect information you provide directly, information gathered automatically as you use the site, and information from trusted third parties where permitted by law."
    ],
    list: [
      "Information you provide: your name, email address, company, phone number, budget range, service interests and the contents of your message when you submit an enquiry.",
      "Information collected automatically: IP address, browser and device type, referring pages, pages viewed and approximate location derived from your IP address.",
      "Cookies and similar technologies: small files used to recognise your browser, remember preferences and measure site performance.",
      "Information from third parties: analytics providers and, where applicable, publicly available business information."
    ]
  },
  {
    id: "how-we-use-information",
    heading: "3. How We Use Information",
    paragraphs: [
      "We use personal information for legitimate business purposes, including to:"
    ],
    list: [
      "Respond to enquiries and provide the services you request.",
      "Prepare proposals, contracts and invoices.",
      "Operate, maintain, secure and improve our website and services.",
      "Send administrative messages and, where you have opted in, relevant updates.",
      "Comply with legal, accounting and regulatory obligations.",
      "Detect, prevent and address fraud, security incidents and misuse."
    ]
  },
  {
    id: "cookies",
    heading: "4. Cookies",
    paragraphs: [
      "Our website uses cookies and similar technologies to make the site work, remember your preferences and understand how visitors use it. You can control or delete cookies through your browser settings; disabling cookies may affect certain features of the site.",
      "Where required, we will request your consent before setting non-essential cookies."
    ]
  },
  {
    id: "data-retention",
    heading: "5. Data Retention",
    paragraphs: [
      "We retain personal information only for as long as needed to fulfil the purposes described in this policy, to comply with our legal and contractual obligations, and to resolve disputes. When information is no longer required, we securely delete or anonymise it."
    ]
  },
  {
    id: "your-rights",
    heading: "6. Your Rights",
    paragraphs: [
      "Depending on where you live, you may have rights regarding your personal information, including the right to:"
    ],
    list: [
      "Access the personal information we hold about you.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of your personal information.",
      "Object to or restrict certain processing.",
      "Withdraw consent where processing is based on consent.",
      "Request a portable copy of the information you provided."
    ]
  },
  {
    id: "security",
    heading: "7. Security",
    paragraphs: [
      "We apply appropriate technical and organisational measures to protect personal information against unauthorised access, loss or alteration. These measures include encryption in transit, access controls and regular review of our practices.",
      "No method of transmission or storage is completely secure, so we cannot guarantee absolute security — but we work hard to protect your information and will notify affected parties where required by law."
    ]
  },
  {
    id: "third-party-services",
    heading: "8. Third-Party Services",
    paragraphs: [
      "We may share information with trusted service providers who help us operate our business, such as hosting, analytics and email providers. These providers are contractually required to protect your information and to use it only for the purposes we specify.",
      "We do not sell your personal information. We may disclose information where required by law or to protect our rights."
    ]
  },
  {
    id: "changes",
    heading: "9. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will revise the “Last updated” date above and, where changes are significant, provide a more prominent notice."
    ]
  },
  {
    id: "contact",
    heading: "10. Contact for Privacy",
    paragraphs: [
      "If you have questions about this policy or wish to exercise your rights, contact our privacy team at the details below and we will respond as soon as reasonably possible."
    ],
    list: [`Email: ${siteConfig.email}`, `Phone: ${siteConfig.phone}`, `Address: ${siteConfig.address}`]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="This policy explains what personal information we collect, how we use it and the choices available to you."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
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
