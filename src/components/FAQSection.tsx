import React, { useState } from 'react';
import { FAQS, RESORT_INFO, getWhatsAppUrl } from '../data/resortData';
import { HelpCircle, ChevronDown, MessageSquare, Phone } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F7F5EF] relative border-t border-[#12382D]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#1B4B3B] font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Common Questions</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12382D] tracking-tight mb-4">
            Frequently Asked Inquiries
          </h2>

          <p className="text-base text-[#202923]/80 leading-relaxed font-light">
            Helpful answers to guide your stay, road trip planning, and booking process for Husnain Resort.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#12382D]/10 overflow-hidden shadow-xs transition-shadow hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#12382D]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#1B4B3B]/10 text-[#1B4B3B] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#1B4B3B] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-[#202923]/80 leading-relaxed border-t border-slate-100 pt-4 animate-fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#C5A46D]/30 shadow-md text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-lg font-bold text-[#12382D]">
              Have a specific question not answered here?
            </h4>
            <p className="text-xs text-[#202923]/70">
              Speak directly with Husnain Resort management on phone or WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={RESORT_INFO.phoneTel}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#12382D] text-xs font-semibold font-cinzel uppercase tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#1B4B3B]" />
              <span>{RESORT_INFO.phoneDisplay}</span>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold font-cinzel uppercase tracking-wider transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
