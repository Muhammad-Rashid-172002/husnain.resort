import React from 'react';
import { RESORT_INFO, getWhatsAppUrl } from '../data/resortData';
import { MapPin, Phone, MessageSquare, Compass, Shield, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F7F5EF] relative overflow-hidden">
      {/* Subtle organic watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] rounded-full bg-[#DCE7D9]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Proposal context badge for the resort owner */}
        <div className="mb-10 p-3 sm:p-4 rounded-xl bg-[#12382D]/5 border border-[#1B4B3B]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-[#12382D]">
            <Sparkles className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span>
              <strong>Website Concept Proposal for Husnain Resort:</strong> Crafted by{' '}
              <span className="font-semibold text-[#1B4B3B]">{RESORT_INFO.agencyCredit}</span> to demonstrate high-conversion hospitality UI.
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#12382D]/70 bg-white px-2.5 py-1 rounded border border-[#12382D]/10 shrink-0">
            Client Presentation Demo
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition with 2 Framed Photographs */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image: Mountain Lodge & Greenery */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80"
                  alt="Scenic accommodation ambiance in Mansehra"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Secondary Overlapping Accent Image */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-3/5 rounded-xl overflow-hidden shadow-2xl border-4 border-[#F7F5EF]">
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                  alt="Peaceful interior room comfort"
                  className="w-full h-44 object-cover"
                />
              </div>

              {/* Decorative Brand Accent Box */}
              <div className="absolute -top-4 -left-4 bg-[#12382D] text-[#F7F5EF] p-4 rounded-lg shadow-xl border border-[#C5A46D]/30 hidden sm:block">
                <span className="block font-cinzel text-xs tracking-widest text-[#C5A46D] uppercase">
                  Verified Location
                </span>
                <span className="text-xs font-light text-[#DCE7D9]">
                  SRSP Link Road, Mansehra
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Facts */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#1B4B3B] font-bold mb-3">
              <Compass className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>About Husnain Resort</span>
            </div>

            {/* Main Editorial Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12382D] leading-[1.2] tracking-tight mb-6">
              A Welcoming Stay in <span className="text-[#1B4B3B] italic">Mansehra</span>
            </h2>

            {/* Respectful, truthful narrative */}
            <p className="text-base sm:text-lg text-[#202923]/85 font-light leading-relaxed mb-6">
              Situated near Shahnawaz Chowk along the SRSP Link Road, Husnain Resort offers a restful accommodation haven for guests visiting Mansehra, travelers passing through toward Abbottabad and Kaghan, and families seeking quiet comfort in Khyber Pakhtunkhwa.
            </p>

            <p className="text-sm sm:text-base text-[#202923]/80 leading-relaxed mb-8">
              Whether you are completing a long highway drive, attending regional family events, or setting off to explore the legendary Hazara division, our premises are dedicated to providing calm surroundings, sincere local hospitality, and hassle-free assistance.
            </p>

            {/* Three Pillar Fact Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pt-4 border-t border-[#12382D]/10">
              <div className="p-3.5 rounded-lg bg-white/70 border border-[#12382D]/10">
                <MapPin className="w-5 h-5 text-[#C5A46D] mb-1.5" />
                <h4 className="font-cinzel text-xs font-bold text-[#12382D] uppercase tracking-wider mb-1">
                  Strategic Hub
                </h4>
                <p className="text-xs text-[#202923]/70">
                  Near Shahnawaz Chowk with smooth connectivity to Hazara arteries.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white/70 border border-[#12382D]/10">
                <Shield className="w-5 h-5 text-[#C5A46D] mb-1.5" />
                <h4 className="font-cinzel text-xs font-bold text-[#12382D] uppercase tracking-wider mb-1">
                  Peaceful Rest
                </h4>
                <p className="text-xs text-[#202923]/70">
                  Quiet setting designed to restore energy for travelers & families.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white/70 border border-[#12382D]/10">
                <Phone className="w-5 h-5 text-[#C5A46D] mb-1.5" />
                <h4 className="font-cinzel text-xs font-bold text-[#12382D] uppercase tracking-wider mb-1">
                  Direct Care
                </h4>
                <p className="text-xs text-[#202923]/70">
                  Direct telephone and WhatsApp communication with on-site staff.
                </p>
              </div>
            </div>

            {/* Direct Action Link */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#1B4B3B] hover:bg-[#12382D] text-[#F7F5EF] font-cinzel text-xs uppercase tracking-wider font-semibold transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-[#C5A46D]" />
                <span>Message Resort Reception</span>
              </a>

              <a
                href={RESORT_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white hover:bg-slate-50 text-[#12382D] border border-[#12382D]/20 font-cinzel text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#1B4B3B]" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
