import React from 'react';
import { RESORT_INFO, getWhatsAppUrl } from '../data/resortData';
import { MapPin, Phone, MessageSquare, ExternalLink, Sparkles, Navigation } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#12382D] text-[#F7F5EF] pt-16 pb-12 border-t border-[#C5A46D]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Narrative (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col">
              <span className="font-cinzel text-2xl font-bold tracking-[0.16em] text-[#F7F5EF]">
                HUSNAIN RESORT
              </span>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A46D] font-medium">
                Mansehra · Khyber Pakhtunkhwa
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#DCE7D9]/80 leading-relaxed font-light">
              A welcoming mountain retreat and accommodation sanctuary nestled near Shahnawaz Chowk on SRSP Link Road. Providing peaceful comfort and genuine hospitality for travelers visiting the Hazara region.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#C5A46D] font-cinzel">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Accommodation & Nature Retreat</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D] mb-4">
              Explore The Resort
            </h4>
            <ul className="space-y-2 text-xs font-medium tracking-wide">
              <li>
                <a href="#home" className="text-[#DCE7D9] hover:text-[#C5A46D] transition-colors">
                  Home & Overview
                </a>
              </li>
              <li>
                <a href="#stay" className="text-[#DCE7D9] hover:text-[#C5A46D] transition-colors">
                  Accommodations & Suites
                </a>
              </li>
              <li>
                <a href="#3d-experience" className="text-[#DCE7D9] hover:text-[#C5A46D] transition-colors">
                  3D Pavilion Architecture
                </a>
              </li>
              <li>
                <a href="#experiences" className="text-[#DCE7D9] hover:text-[#C5A46D] transition-colors">
                  Hazara Experiences
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-[#DCE7D9] hover:text-[#C5A46D] transition-colors">
                  Atmospheric Gallery
                </a>
              </li>
              <li>
                <a href="#facilities" className="text-[#DCE7D9] hover:text-[#C5A46D] transition-colors">
                  Facilities & Services
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[#DCE7D9] hover:text-[#C5A46D] transition-colors">
                  Inquiries & FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Verified Contacts (Col 8-12) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D] mb-4">
              Location & Contact Details
            </h4>

            <div className="space-y-3 text-xs text-[#DCE7D9]/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <span>{RESORT_INFO.fullAddress}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <a href={RESORT_INFO.phoneTel} className="hover:text-white font-medium">
                  {RESORT_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-medium"
                >
                  WhatsApp: +92 324 0307699
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={RESORT_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-cinzel uppercase tracking-wider text-white border border-white/15 transition-colors"
              >
                <Navigation className="w-3 h-3 text-[#C5A46D]" />
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={RESORT_INFO.tripadvisorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-cinzel uppercase tracking-wider text-white border border-white/15 transition-colors"
              >
                <span>Tripadvisor Listing</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Agency Demo Credit & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCE7D9]/70">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} Husnain Resort, Mansehra. All rights reserved.</p>
            <p className="text-[11px] text-[#DCE7D9]/50 mt-0.5">
              Postal Code: 21300 • Khyber Pakhtunkhwa, Pakistan
            </p>
          </div>

          <div className="text-center sm:text-right">
            <span className="inline-block px-3 py-1 rounded bg-black/30 border border-white/10 text-[11px] text-[#C5A46D]">
              Website concept & digital strategy proposal by <strong>{RESORT_INFO.agencyCredit}</strong>
            </span>
            <p className="text-[10px] text-[#DCE7D9]/50 mt-1">
              Presented for leadership review and deployment.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
