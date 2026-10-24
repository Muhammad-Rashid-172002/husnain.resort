import React, { useState, useEffect } from 'react';
import { RESORT_INFO, getWhatsAppUrl } from '../data/resortData';
import { Menu, X, Phone, MessageCircle, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Stay', href: '#stay' },
    { name: '3D Preview', href: '#3d-experience' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#12382D] text-[#F7F5EF] shadow-xl py-3 border-b border-[#C5A46D]/20'
            : 'bg-gradient-to-b from-black/75 via-black/35 to-transparent text-[#F7F5EF] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Wordmark Logo */}
            <a href="#home" className="group flex flex-col focus:outline-none">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#F7F5EF] group-hover:text-[#C5A46D] transition-colors">
                HUSNAIN RESORT
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C5A46D] font-medium -mt-0.5">
                Mansehra · Hazara
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#F7F5EF]/90 hover:text-[#C5A46D] transition-colors relative py-1 text-[13px] uppercase tracking-wider font-cinzel after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C5A46D] hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop CTA & Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with Husnain Resort on WhatsApp"
                className="inline-flex items-center justify-center p-2 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white transition-transform hover:scale-105 shadow-md border border-emerald-400/30"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={RESORT_INFO.phoneTel}
                title="Call Husnain Resort"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#F7F5EF] hover:text-[#C5A46D] transition-colors border border-white/15 hover:border-[#C5A46D]/50"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>{RESORT_INFO.phoneDisplay}</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="px-4 py-2 rounded-md bg-[#C5A46D] hover:bg-[#b59359] text-[#12382D] text-xs font-semibold tracking-wider uppercase font-cinzel transition-all shadow-lg hover:shadow-[#C5A46D]/20 cursor-pointer"
              >
                Plan Your Stay
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenBooking}
                className="px-3 py-1.5 rounded bg-[#C5A46D] text-[#12382D] text-xs font-bold uppercase font-cinzel"
              >
                Inquire
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-[#F7F5EF] hover:text-[#C5A46D] hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed top-0 right-0 bottom-0 w-[82%] max-w-sm bg-[#12382D] text-[#F7F5EF] p-6 shadow-2xl flex flex-col justify-between border-l border-[#C5A46D]/20 z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex flex-col">
                  <span className="font-cinzel text-lg font-bold tracking-widest text-[#F7F5EF]">
                    HUSNAIN RESORT
                  </span>
                  <span className="text-[10px] text-[#C5A46D] tracking-widest uppercase">
                    Mansehra, KPK
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded text-[#DCE7D9] hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-cinzel tracking-wider text-[#F7F5EF]/90 hover:text-[#C5A46D] py-1 border-b border-white/5"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-md bg-[#C5A46D] text-[#12382D] font-cinzel font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan Your Stay</span>
              </button>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs tracking-wider flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={RESORT_INFO.phoneTel}
                className="text-center text-xs text-[#DCE7D9] hover:text-[#C5A46D] py-1"
              >
                Direct Call: {RESORT_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
