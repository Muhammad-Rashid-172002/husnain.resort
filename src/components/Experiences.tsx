import React from 'react';
import { EXPERIENCES_DATA, getWhatsAppUrl } from '../data/resortData';
import { Compass, Sparkles, Check, ArrowRight } from 'lucide-react';

export const Experiences: React.FC = () => {
  return (
    <section id="experiences" className="py-20 sm:py-28 bg-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#1B4B3B] font-bold mb-3">
            <Compass className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Hazara & Mansehra Exploration</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12382D] tracking-tight mb-4">
            Embrace the Northern Journey
          </h2>

          <p className="text-base text-[#202923]/80 leading-relaxed font-light">
            Mansehra is celebrated as the historic crossroad of northern Khyber Pakhtunkhwa. Discover how Husnain Resort serves as your comforting base.
          </p>

          <div className="mt-4 text-[11px] font-mono text-[#12382D]/70 bg-[#DCE7D9]/50 border border-[#1B4B3B]/15 px-3 py-1.5 rounded-md inline-block">
            Note: Destination highlights provide regional context for travelers; specific resort activities and amenities are confirmed directly with management.
          </div>
        </div>

        {/* Alternating Editorial Stories */}
        <div className="space-y-16 sm:space-y-24">
          {EXPERIENCES_DATA.map((item, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Image Column */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl border-2 border-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-xs font-cinzel text-white bg-black/50 px-3 py-1 rounded backdrop-blur-xs tracking-wider uppercase">
                      {item.kicker}
                    </span>
                  </div>
                </div>

                {/* Narrative Text Column */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-center`}>
                  <span className="text-xs font-cinzel uppercase tracking-[0.2em] text-[#C5A46D] font-bold mb-2">
                    {item.kicker}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#12382D] mb-4 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#202923]/80 leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#12382D]">
                        <div className="w-5 h-5 rounded-full bg-[#1B4B3B]/10 text-[#1B4B3B] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <a
                      href={getWhatsAppUrl(`Assalam-o-Alaikum, I am planning a trip to Mansehra and interested in staying at Husnain Resort for: ${item.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-cinzel uppercase tracking-wider font-bold text-[#1B4B3B] hover:text-[#C5A46D] transition-colors group"
                    >
                      <span>Inquire About Group or Road Trip Stay</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
