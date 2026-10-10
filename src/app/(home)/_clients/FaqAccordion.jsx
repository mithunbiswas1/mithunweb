// src/app/(home)/_clients/FaqAccordion.jsx

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function FaqAccordion({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className="py-6 sm:py-7 transition-all duration-500"
            style={{
              transitionDelay: `${idx * 40}ms`,
            }}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none cursor-pointer"
              aria-expanded={isOpen}
            >
              <span
                className={`text-lg sm:text-xl font-normal transition-colors duration-300 ${
                  isOpen
                    ? "text-neutral-950 font-medium"
                    : "text-neutral-800 group-hover:text-black"
                }`}
              >
                {faq.question}
              </span>
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? "border-black bg-black text-white rotate-45"
                    : "border-neutral-300 text-neutral-700 group-hover:border-black group-hover:text-black rotate-0"
                }`}
              >
                <Plus className="w-4 h-4 transition-transform duration-300" />
              </span>
            </button>

            {/* Smooth Height Accordion Expansion */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100 pt-4" : "grid-rows-[0fr] opacity-0 pt-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pr-10 text-neutral-600 font-light text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
