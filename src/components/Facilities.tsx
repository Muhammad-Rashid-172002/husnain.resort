import React, { useState } from 'react';
import { RESORT_FACILITIES, getWhatsAppUrl } from '../data/resortData';
import {
  Car,
  ShieldCheck,
  Trees,
  Wifi,
  Utensils,
  Users,
  Flame,
  Sparkles,
  Info,
  CheckCircle2,
  Clock,
  MessageSquare
} from 'lucide-react';

export const Facilities: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending'>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-6 h-6 text-[#1B4B3B]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#1B4B3B]" />;
      case 'Trees': return <Trees className="w-6 h-6 text-[#1B4B3B]" />;
      case 'Wifi': return <Wifi className="w-6 h-6 text-[#1B4B3B]" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-[#1B4B3B]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#1B4B3B]" />;
      case 'Flame': return <Flame className="w-6 h-6 text-[#1B4B3B]" />;
      default: return <Sparkles className="w-6 h-6 text-[#1B4B3B]" />;
    }
  };

  const filteredFacilities = RESORT_FACILITIES.filter((f) => {
    if (filter === 'confirmed') return f.status === 'confirmed';
    if (filter === 'pending') return f.status === 'pending_verification';
    return true;
  });

  return (
    <section id="facilities" className="py-20 sm:py-28 bg-[#F7F5EF] relative border-t border-[#12382D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#1B4B3B] font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Resort Amenities & Comfort</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12382D] tracking-tight mb-4">
            Facilities & Guest Convenience
          </h2>

          <p className="text-base text-[#202923]/80 leading-relaxed font-light mb-6">
            Essential hospitality amenities and configurable property features at Husnain Resort.
          </p>

          {/* Owner Customization Notice */}
          <div className="inline-flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#12382D]/15 text-left text-xs text-[#202923]/85 shadow-xs max-w-2xl mx-auto">
            <Info className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#12382D]">Owner Verification Transparency:</strong> We show verified amenities alongside demo facility modules that can be toggled and updated directly by Husnain Resort management.
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center items-center gap-2 mb-10 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-cinzel uppercase tracking-wider transition-all ${
              filter === 'all'
                ? 'bg-[#1B4B3B] text-[#F7F5EF] shadow-sm font-bold'
                : 'bg-white text-[#202923]/70 hover:bg-[#DCE7D9]/40 border border-[#12382D]/10'
            }`}
          >
            All Amenities ({RESORT_FACILITIES.length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-1.5 rounded-full text-xs font-cinzel uppercase tracking-wider transition-all ${
              filter === 'confirmed'
                ? 'bg-[#1B4B3B] text-[#F7F5EF] shadow-sm font-bold'
                : 'bg-white text-[#202923]/70 hover:bg-[#DCE7D9]/40 border border-[#12382D]/10'
            }`}
          >
            Confirmed Features
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-1.5 rounded-full text-xs font-cinzel uppercase tracking-wider transition-all ${
              filter === 'pending'
                ? 'bg-[#1B4B3B] text-[#F7F5EF] shadow-sm font-bold'
                : 'bg-white text-[#202923]/70 hover:bg-[#DCE7D9]/40 border border-[#12382D]/10'
            }`}
          >
            Pending Owner Approval
          </button>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFacilities.map((facility) => {
            const isConfirmed = facility.status === 'confirmed';

            return (
              <div
                key={facility.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#12382D]/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#DCE7D9]/40 group-hover:bg-[#DCE7D9]/80 flex items-center justify-center transition-colors">
                      {getIcon(facility.iconName)}
                    </div>

                    {isConfirmed ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Confirmed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>Pending Owner Check</span>
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#1B4B3B] font-semibold block mb-1">
                    {facility.category}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-[#12382D] mb-2 group-hover:text-[#1B4B3B] transition-colors">
                    {facility.title}
                  </h3>

                  <p className="text-xs text-[#202923]/75 leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-[#202923]/60 flex items-center justify-between">
                  <span>{isConfirmed ? 'Operational' : 'Demo Feature'}</span>
                  <a
                    href={getWhatsAppUrl(`Assalam-o-Alaikum, I would like to ask if ${facility.title} is available for staying guests at Husnain Resort.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1B4B3B] hover:text-[#C5A46D] font-medium inline-flex items-center gap-1"
                    title="Inquire about this facility"
                  >
                    <span>Inquire</span>
                    <MessageSquare className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
