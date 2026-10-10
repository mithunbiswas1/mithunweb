// src/app/(home)/_components/Contact.jsx

import { Check, Mail, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";
import ContactForm from "../_clients/ContactForm";
import Section from "@/components/shared/Section";
import { H2, P, Typography } from "@/components/ui/Typography";

export default function Contact() {
  return (
    <Section id="contact" theme="dark">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Details (Server Rendered) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Typography variant="subheading" color="muted" className="mb-4 text-neutral-400">
                GET IN TOUCH
              </Typography>
              <H2 weight="regular" color="white" className="mb-6">
                Your next project starts here
              </H2>
              <P variant="body" color="muted" className="text-base sm:text-lg mb-10 text-neutral-400">
                We understand your vision, your goals, and show how design and code can transform your idea into a world-class digital product.
              </P>

              {/* Checkpoints */}
              <div className="space-y-4 mb-12">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-light text-neutral-300">
                    Deep understanding of the project, objectives, and requirements;
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-light text-neutral-300">
                    Clear, actionable next steps to bring your project to life.
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-4 pt-6 border-t border-neutral-800">
              <a
                href="mailto:hello@mithunweb.com"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:scale-105 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-mono tracking-wide">hello@mithunweb.com</span>
              </a>

              <Button
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                variant="lime"
                size="md"
                rounded="full"
                className="gap-2.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form Card (Client Island) */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
            <ContactForm />
          </div>
        </div>
    </Section>
  );
}
