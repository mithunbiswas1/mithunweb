"use client";

import { useState } from "react";
import { FAQS } from "@/data/mithunweb-data";
import { Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      id="faq"
      data-theme="light"
      className="bg-[#ffffff] text-black py-28 sm:py-40 px-4 sm:px-6 relative border-t border-neutral-200"
    >
      <div className="max-w-[1400px] mx-auto w-[90%]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          {/* Left Column: Accordion Questions */}
          <div className="w-full lg:max-w-3xl flex-1">
            <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase mb-4">
              PERGUNTAS FREQUENTES
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal leading-[1.15] tracking-tight text-neutral-950 mb-12">
              Dúvidas comuns antes de começar
            </h2>

            <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div key={idx} className="py-6 sm:py-7 transition-colors">
                    <button
                      onClick={() => toggle(idx)}
                      className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none"
                    >
                      <span className="text-lg sm:text-xl font-normal text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        {faq.question}
                      </span>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 group-hover:border-black group-hover:text-black transition-all">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pt-4 pr-10 text-neutral-600 font-light text-sm sm:text-base leading-relaxed animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Card */}
          <div className="w-full lg:w-[360px] lg:sticky lg:top-32 flex-shrink-0">
            <div className="rounded-3xl bg-neutral-50 border border-neutral-200 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-2.5 h-2.5 rounded-full bg-black inline-block mb-6" />
                <h3 className="text-2xl font-normal text-neutral-950 mb-3 tracking-tight">
                  Ainda tem dúvidas?
                </h3>
                <p className="text-sm font-light text-neutral-600 leading-relaxed mb-8">
                  Tem mais perguntas? Teremos prazer em respondê-las. Não hesite em entrar em contato com nossa equipe.
                </p>
              </div>

              <Link
                href="#contato"
                className="inline-flex items-center justify-between w-full px-6 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 text-sm font-medium tracking-wide transition-all group"
              >
                <span>Fale com a Mithun Web</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
