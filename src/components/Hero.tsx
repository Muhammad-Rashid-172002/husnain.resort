import React, { useState } from 'react';
import { RESORT_INFO, getWhatsAppUrl } from '../data/resortData';
import { ChevronDown, Calendar, Users, ArrowRight, MessageSquare, Compass, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenBooking: (prefill?: { checkIn?: string; checkOut?: string; guests?: number }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  // Quick booking bar state
  const [quickCheckIn, setQuickCheckIn] = useState('');
  const [quickCheckOut, setQuickCheckOut] = useState('');
  const [quickGuests, setQuickGuests] = useState('2');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({
      checkIn: quickCheckIn,
      checkOut: quickCheckOut,
      guests: parseInt(quickGuests, 10) || 2
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#12382D]">
      {/* Background Image with Cinematic Dark/Warm Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="Husnain Resort Mountain Backdrop in Mansehra"
          className="w-full h-full object-cover object-center scale-105 animate-fade-in"
        />
        {/* Multilayer gradient for optimal readability & richness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12382D] via-[#12382D]/60 to-black/70" />
        <div className="absolute inset-0 bg-[#1B4B3B]/25 mix-blend-multiply" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto pt-12 sm:pt-20">
        {/* Kicker badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C5A46D]/40 text-[#F7F5EF] text-xs font-cinzel tracking-[0.2em] uppercase mb-6 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>Khyber Pakhtunkhwa · Mansehra</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F7F5EF] leading-[1.12] tracking-tight mb-6 max-w-4xl mx-auto">
          Find Your Peace at <span className="text-[#C5A46D] italic font-serif">Husnain Resort</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-[#F7F5EF]/90 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Discover a welcoming stay in Mansehra, where comfort, hospitality, and the beauty of your journey come together.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <a
            href="#stay"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-md bg-[#C5A46D] hover:bg-[#b59359] text-[#12382D] font-cinzel font-bold text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Explore Your Stay</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md bg-white/10 hover:bg-white/20 text-[#F7F5EF] border border-white/25 font-cinzel font-medium text-xs uppercase tracking-wider transition-all"
          >
            <MessageSquare className="w-4 h-4 text-[#C5A46D]" />
            <span>Contact the Resort</span>
          </a>
        </div>

        {/* Fact Transparency Micro Badge */}
        <div className="inline-flex items-center gap-2 text-[11px] text-[#DCE7D9]/80 font-mono bg-black/40 px-3 py-1 rounded border border-white/10">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Direct Contact: {RESORT_INFO.phoneDisplay} • SRSP Link Road, Near Shahnawaz Chowk</span>
        </div>
      </div>

      {/* Floating Quick Inquiry Bar */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full mt-6">
        <form
          onSubmit={handleQuickSubmit}
          className="bg-[#12382D]/95 border border-[#C5A46D]/35 rounded-xl p-4 sm:p-5 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end"
        >
          {/* Check In */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-cinzel font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Check-in Date</span>
            </label>
            <input
              type="date"
              value={quickCheckIn}
              onChange={(e) => setQuickCheckIn(e.target.value)}
              className="bg-black/30 border border-white/15 rounded-md px-3 py-2 text-sm text-[#F7F5EF] focus:outline-none focus:border-[#C5A46D] transition-colors"
            />
          </div>

          {/* Check Out */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-cinzel font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Check-out Date</span>
            </label>
            <input
              type="date"
              value={quickCheckOut}
              onChange={(e) => setQuickCheckOut(e.target.value)}
              className="bg-black/30 border border-white/15 rounded-md px-3 py-2 text-sm text-[#F7F5EF] focus:outline-none focus:border-[#C5A46D] transition-colors"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-cinzel font-semibold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Guests</span>
            </label>
            <select
              value={quickGuests}
              onChange={(e) => setQuickGuests(e.target.value)}
              className="bg-black/30 border border-white/15 rounded-md px-3 py-2 text-sm text-[#F7F5EF] focus:outline-none focus:border-[#C5A46D] transition-colors"
            >
              <option value="1" className="bg-[#12382D] text-white">1 Solo Traveler</option>
              <option value="2" className="bg-[#12382D] text-white">2 Guests (Couple / Pair)</option>
              <option value="3" className="bg-[#12382D] text-white">3 Guests</option>
              <option value="4" className="bg-[#12382D] text-white">4 Family Guests</option>
              <option value="5" className="bg-[#12382D] text-white">5+ Group / Extended Family</option>
            </select>
          </div>

          {/* Submit Action */}
          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-md bg-[#C5A46D] hover:bg-[#b59359] text-[#12382D] font-cinzel font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Check Availability</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 text-center mt-6">
        <a
          href="#about"
          className="inline-flex flex-col items-center text-[#DCE7D9]/60 hover:text-[#C5A46D] transition-colors"
          aria-label="Scroll to content"
        >
          <span className="text-[10px] tracking-widest uppercase font-cinzel mb-1">Scroll to discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
