import React from 'react';
import { RESORT_INFO, getWhatsAppUrl } from '../data/resortData';
import { MapPin, Navigation, Phone, MessageSquare, Compass, ExternalLink, Clock, Car } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const nearbyLandmarks = [
    { name: 'Shahnawaz Chowk', distance: '~2 mins', note: 'Immediate key landmark on SRSP Link Road' },
    { name: 'Mansehra Main Bazaar & Bus Stand', distance: '~8 mins', note: 'Central commercial and transit hub' },
    { name: 'Hazara Motorway / Karakoram Highway', distance: '~10 mins', note: 'Direct northern highway interchange' },
    { name: 'Abbottabad City Center', distance: '~35 mins', note: 'Scenic drive south along N-35' }
  ];

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#F7F5EF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#1B4B3B] font-bold mb-3">
            <Compass className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Finding Husnain Resort</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12382D] tracking-tight mb-4">
            Prime Foothill Location
          </h2>

          <p className="text-base text-[#202923]/80 leading-relaxed font-light">
            Conveniently situated along the SRSP Link Road near Shahnawaz Chowk in Mansehra, providing swift access while maintaining a quiet setting.
          </p>
        </div>

        {/* Location Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address, Phone & Driving Action */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#12382D]/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-cinzel uppercase tracking-widest text-[#C5A46D] font-bold mb-2">
                <MapPin className="w-4 h-4 text-[#1B4B3B]" />
                <span>Verified Address</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#12382D] mb-4">
                Husnain Resort, Mansehra
              </h3>

              {/* Address Box */}
              <div className="bg-[#F7F5EF] p-4 rounded-xl border border-[#12382D]/10 mb-6">
                <p className="text-sm text-[#202923] font-medium leading-relaxed">
                  {RESORT_INFO.fullAddress}
                </p>
                <div className="mt-2 text-xs text-[#1B4B3B] font-mono">
                  Postal Code: 21300 • Khyber Pakhtunkhwa, Pakistan
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1B4B3B]/10 flex items-center justify-center text-[#1B4B3B] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#202923]/60 block">
                      Direct Telephone
                    </span>
                    <a
                      href={RESORT_INFO.phoneTel}
                      className="text-base font-semibold text-[#12382D] hover:text-[#C5A46D] transition-colors"
                    >
                      {RESORT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-700 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#202923]/60 block">
                      WhatsApp Reception
                    </span>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-emerald-800 hover:underline"
                    >
                      +92 324 0307699 (Instant Chat)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <a
                href={RESORT_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-lg bg-[#1B4B3B] hover:bg-[#12382D] text-[#F7F5EF] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4 text-[#C5A46D]" />
                <span>Open in Google Maps (Directions)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={getWhatsAppUrl('Assalam-o-Alaikum, I am traveling to Husnain Resort and need assistance with directions from Shahnawaz Chowk.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-lg bg-white hover:bg-slate-50 text-[#12382D] border border-[#12382D]/20 font-cinzel font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Ask for Route Guidance on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Styled Map & Travel Proximities */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-2xl overflow-hidden shadow-xl border border-[#12382D]/10">
            {/* Styled Map Container */}
            <div className="relative aspect-[16/10] bg-[#12382D] overflow-hidden flex items-center justify-center p-6">
              {/* Stylized Topographic / Cartographic Vector Graphic */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F7F5EF" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Topo contour rings */}
                  <circle cx="50%" cy="50%" r="80" fill="none" stroke="#C5A46D" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="50%" cy="50%" r="140" fill="none" stroke="#C5A46D" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="50%" cy="50%" r="200" fill="none" stroke="#C5A46D" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Pin Card in Center */}
              <div className="relative z-10 bg-[#12382D]/95 border border-[#C5A46D]/50 text-white p-5 rounded-2xl shadow-2xl max-w-sm text-center">
                <div className="w-12 h-12 rounded-full bg-[#C5A46D] text-[#12382D] flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-cinzel text-base font-bold tracking-wider text-[#F7F5EF] uppercase">
                  Husnain Resort
                </h4>
                <p className="text-xs text-[#DCE7D9] mt-1 font-mono">
                  SRSP Link Rd, Near Shahnawaz Chowk
                </p>
                <div className="mt-4 flex justify-center">
                  <a
                    href={RESORT_INFO.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C5A46D] text-[#12382D] font-cinzel font-bold text-[11px] uppercase tracking-wider hover:bg-[#b59359] transition-colors"
                  >
                    <span>Launch GPS Route</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Travel Times & Landmarks */}
            <div className="p-6 sm:p-7 bg-white">
              <span className="text-xs font-cinzel uppercase tracking-wider text-[#12382D] font-bold block mb-4 flex items-center gap-2">
                <Car className="w-4 h-4 text-[#1B4B3B]" />
                <span>Estimated Travel Distances from Key Points</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nearbyLandmarks.map((lm, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#F7F5EF] border border-[#12382D]/10 flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#1B4B3B]/10 text-[#1B4B3B] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#12382D]">{lm.name}</span>
                        <span className="text-[10px] font-mono font-bold text-[#1B4B3B] bg-white px-1.5 py-0.5 rounded border border-[#1B4B3B]/15">
                          {lm.distance}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#202923]/70 block mt-0.5">{lm.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
