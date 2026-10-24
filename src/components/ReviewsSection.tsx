import React from 'react';
import { RESORT_INFO, getWhatsAppUrl } from '../data/resortData';
import { MessageSquare, ExternalLink, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#1B4B3B] text-[#F7F5EF] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-radial from-[#12382D]/40 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#C5A46D] font-bold mb-3">
          <HeartHandshake className="w-4 h-4 text-[#C5A46D]" />
          <span>Guest Experience & Feedback</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-[#F7F5EF]">
          Authentic Guest Perspectives
        </h2>

        <p className="text-base text-[#DCE7D9] max-w-2xl mx-auto leading-relaxed font-light mb-10">
          We honor genuine traveler feedback. Rather than presenting curated testimonials, we invite you to view independent reviews or share your personal inquiries directly with our reception team.
        </p>

        {/* Verification and Review Invitation Card */}
        <div className="bg-[#12382D]/90 border border-[#C5A46D]/35 rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C5A46D]/20 text-[#C5A46D] flex items-center justify-center shrink-0 border border-[#C5A46D]/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-white mb-1">
                  Tripadvisor Listed Property
                </h4>
                <p className="text-xs text-[#DCE7D9]/80 leading-relaxed max-w-md">
                  Husnain Resort is publicly cataloged on Tripadvisor under Mansehra, Khyber Pakhtunkhwa. Explore community photos, questions, and guest opinions.
                </p>
              </div>
            </div>

            <a
              href={RESORT_INFO.tripadvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#C5A46D] hover:bg-[#b59359] text-[#12382D] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-102 shrink-0 cursor-pointer"
            >
              <span>Read on Tripadvisor</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Feedback & Inquiries Callout */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCE7D9]/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A46D]" />
              <span>Have you recently stayed at Husnain Resort? Share your thoughts with us.</span>
            </div>

            <a
              href={getWhatsAppUrl('Assalam-o-Alaikum, I would like to share feedback regarding my stay at Husnain Resort, Mansehra.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C5A46D] hover:text-white font-cinzel tracking-wider uppercase font-semibold underline"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Guest Relations</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
