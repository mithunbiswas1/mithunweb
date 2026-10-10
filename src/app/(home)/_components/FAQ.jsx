// src/app/(home)/_components/FAQ.jsx

import { FAQS } from "../_data/home-data";
import { ArrowRight } from "lucide-react";
import LinkButton from "@/components/ui/LinkButton";
import FaqAccordion from "../_clients/FaqAccordion";
import Section from "@/components/shared/Section";
import { H2, H3, P, Typography } from "@/components/ui/Typography";

export default function FAQ() {
  return (
    <Section id="faq" className="border-t border-neutral-200">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          {/* Left Column: Accordion Questions */}
          <div className="w-full lg:max-w-3xl flex-1">
            <Typography variant="subheading" color="muted" className="mb-4">
              FREQUENTLY ASKED QUESTIONS
            </Typography>
            <H2 weight="regular" className="mb-12">
              Common questions before getting started
            </H2>

            {/* Interactive Accordion Island */}
            <FaqAccordion faqs={FAQS} />
          </div>

          {/* Right Column: Sticky Card */}
          <div className="w-full lg:w-[360px] lg:sticky lg:top-32 flex-shrink-0">
            <div className="rounded-3xl bg-neutral-50 border border-neutral-200 p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between">
              <div>
                <span className="w-2.5 h-2.5 rounded-full bg-black inline-block mb-6 animate-pulse" />
                <H3 weight="regular" className="text-2xl mb-3">
                  Still have questions?
                </H3>
                <P variant="body" color="muted" className="text-sm font-light mb-8">
                  Have more questions? We would love to answer them. Feel free to get in touch with our team anytime.
                </P>
              </div>

              <LinkButton
                href="/contact"
                variant="default"
                size="md"
                className="w-full justify-between"
              >
                <span>Talk to Mithun Web</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </LinkButton>
            </div>
          </div>
        </div>
    </Section>
  );
}
