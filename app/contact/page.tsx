import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Contact ${siteConfig.name}, ${siteConfig.jobTitle} based in ${siteConfig.location.city}, Gujarat. Open to remote jobs, full-time positions, and freelance opportunities. React.js, Next.js, Node.js, and NestJS specialist.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
