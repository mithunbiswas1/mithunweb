// src/app/(pages)/contact/page.jsx

import { Mail, MessageSquare, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { H1, P, Typography } from "@/components/ui/Typography";
import ContactForm from "@/app/(home)/_clients/ContactForm";

export const metadata = {
  title: "Start a Project & Contact | Mithun Web",
  description:
    "Ready to build something extraordinary? Tell us about your goals, timelines, and requirements to receive a customized proposal for custom Framer websites, SaaS platforms, or mobile apps.",
  alternates: {
    canonical: "https://mithunweb.vercel.app/contact",
  },
  openGraph: {
    title: "Start a Project & Contact | Mithun Web",
    description:
      "Tell us about your goals, timelines, and requirements to receive a customized proposal for custom websites, SaaS platforms, or mobile apps.",
    url: "https://mithunweb.vercel.app/contact",
    images: [
      {
        url: "/images/projects/followhr-project.webp",
        width: 1200,
        height: 630,
        alt: "Start a Project with Mithun Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a Project & Contact | Mithun Web",
    description:
      "Tell us about your goals, timelines, and requirements to receive a customized proposal.",
    images: ["/images/projects/followhr-project.webp"],
  },
};

export default function ContactPage() {
  return (
    <main className="pt-36 sm:pt-44 pb-24 sm:pb-36 bg-[#ffffff] text-black">
      <div className="max-w-[1400px] mx-auto w-[90%]">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <Typography variant="subheading" color="muted" className="mb-4">
            START A PROJECT
          </Typography>
          <H1 className="leading-[1.08] tracking-[-0.03em] mb-6">
            Let's craft something exceptional together.
          </H1>
          <P variant="lead" color="muted" className="text-neutral-600">
            Whether you are launching a modern website, building an AI-powered SaaS platform,
            or elevating your existing product, we are here to partner with you from day one.
          </P>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Guarantees & Quick Reach */}
          <div className="lg:col-span-5 space-y-10">
            {/* Direct Connect Options */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6">
              <Typography variant="subheading" color="muted">
                DIRECT CONTACT
              </Typography>

              <div className="space-y-4">
                <a
                  href="mailto:hello@mithunweb.com"
                  className="flex items-center gap-4 text-neutral-800 hover:text-black transition-colors group"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 group-hover:scale-105 group-hover:border-black transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 font-mono">Email us directly</div>
                    <div className="text-sm font-semibold font-mono">hello@mithunweb.com</div>
                  </div>
                </a>

                <div className="pt-2">
                  <Button
                    href="https://wa.me/"
                    target="_blank"
                    rel="noreferrer"
                    variant="lime"
                    size="md"
                    rounded="full"
                    className="w-full gap-2.5 font-medium"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="space-y-4">
              <Typography variant="subheading" color="muted">
                WHAT TO EXPECT
              </Typography>

              <div className="space-y-4 pt-1">
                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-neutral-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">
                      Response within 24 hours
                    </div>
                    <div className="text-xs text-neutral-500 font-light mt-0.5">
                      We review every submission carefully and respond with next steps or initial scope questions.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <ShieldCheck className="w-5 h-5 text-neutral-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">
                      100% IP & Code Ownership
                    </div>
                    <div className="text-xs text-neutral-500 font-light mt-0.5">
                      You own all design files, source code, and assets upon project completion. No vendor lock-in.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-neutral-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">
                      Direct Founder Collaboration
                    </div>
                    <div className="text-xs text-neutral-500 font-light mt-0.5">
                      Work directly with design and engineering leads, not intermediary account managers.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Proposal Form (Client Island) */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
