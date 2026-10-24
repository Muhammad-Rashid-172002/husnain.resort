import React, { useState } from 'react';
import { SAMPLE_ROOMS, RESORT_INFO, getWhatsAppUrl } from '../data/resortData';
import { RoomItem } from '../types';
import { Users, Bed, Check, Sparkles, MessageSquare, ArrowRight, Info, Eye } from 'lucide-react';

interface RoomsProps {
  onSelectRoomForInquiry: (room: RoomItem) => void;
}

export const Rooms: React.FC<RoomsProps> = ({ onSelectRoomForInquiry }) => {
  const [activeModalRoom, setActiveModalRoom] = useState<RoomItem | null>(null);

  return (
    <section id="stay" className="py-20 sm:py-28 bg-[#F7F5EF] relative border-t border-[#12382D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#1B4B3B] font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Accommodations & Suites</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12382D] tracking-tight mb-4">
            Designed for Restful Repose
          </h2>

          <p className="text-base text-[#202923]/80 leading-relaxed font-light">
            Explore sample room configurations designed to showcase the hospitality potential of Husnain Resort.
          </p>

          {/* Owner Notice Banner */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A46D]/15 border border-[#C5A46D]/40 text-[#12382D] text-xs font-mono">
            <Info className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span>
              <strong>Owner Notice:</strong> Sample room types shown below are demo concepts pending owner confirmation. Room rates and exact specs are provided upon direct inquiry.
            </span>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SAMPLE_ROOMS.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#12382D]/10 flex flex-col group"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Category & Demo Pill */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                  <span className="px-3 py-1 rounded bg-[#12382D]/90 text-[#F7F5EF] text-[11px] font-cinzel uppercase tracking-wider border border-[#C5A46D]/30 shadow">
                    {room.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#C5A46D] text-[#12382D] text-[10px] font-mono font-bold tracking-tight shadow">
                    Demo Concept (Approval Pending)
                  </span>
                </div>

                {/* Quick Quickview icon */}
                <button
                  onClick={() => setActiveModalRoom(room)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors"
                  title="Quick View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-medium bg-black/40 px-2.5 py-1 rounded backdrop-blur-xs">
                      <Users className="w-3.5 h-3.5 text-[#C5A46D]" />
                      {room.capacity}
                    </span>
                    <span className="flex items-center gap-1 font-medium bg-black/40 px-2.5 py-1 rounded backdrop-blur-xs">
                      <Bed className="w-3.5 h-3.5 text-[#C5A46D]" />
                      {room.bedConfig}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Details Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#12382D] mb-1.5 group-hover:text-[#1B4B3B] transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#1B4B3B] font-medium italic mb-3">
                    {room.tagline}
                  </p>
                  <p className="text-sm text-[#202923]/75 leading-relaxed mb-5">
                    {room.description}
                  </p>

                  {/* Amenities Preview */}
                  <div className="mb-6">
                    <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#12382D] font-bold block mb-2">
                      Key Features & Amenities
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-xs text-[#202923]/80 bg-[#DCE7D9]/40 border border-[#1B4B3B]/10 px-2.5 py-1 rounded-md"
                        >
                          <Check className="w-3 h-3 text-[#1B4B3B]" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Status & Action */}
                <div className="pt-4 border-t border-[#12382D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#202923]/60 font-cinzel block">
                      Rates & Availability
                    </span>
                    <span className="text-sm font-semibold text-[#1B4B3B]">
                      Contact us for details & rates
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectRoomForInquiry(room)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#1B4B3B] hover:bg-[#12382D] text-[#F7F5EF] text-xs font-cinzel uppercase tracking-wider font-semibold transition-all shadow cursor-pointer"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D]" />
                    </button>

                    <a
                      href={getWhatsAppUrl(`Assalam-o-Alaikum, I would like to inquire about availability and rates for the ${room.name} at Husnain Resort, Mansehra.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
                      title="Direct WhatsApp inquiry for this room"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Room Modal */}
      {activeModalRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#12382D]/20 animate-fade-in">
            <div className="relative aspect-[16/9] w-full bg-slate-900">
              <img
                src={activeModalRoom.imageUrl}
                alt={activeModalRoom.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalRoom(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white text-sm"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <span className="text-xs font-mono text-[#C5A46D] bg-[#12382D] px-2.5 py-1 rounded inline-block mb-2 uppercase">
                Demo Room Concept · Pending Owner Rate Approval
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#12382D] mb-1">
                {activeModalRoom.name}
              </h3>
              <p className="text-xs text-[#1B4B3B] mb-3">{activeModalRoom.tagline}</p>
              <p className="text-sm text-[#202923]/80 mb-4">{activeModalRoom.description}</p>
              <div className="grid grid-cols-2 gap-3 text-xs text-[#202923] mb-6 bg-[#F7F5EF] p-4 rounded-lg">
                <div><strong>Capacity:</strong> {activeModalRoom.capacity}</div>
                <div><strong>Bed Setup:</strong> {activeModalRoom.bedConfig}</div>
                <div><strong>Room Footprint:</strong> {activeModalRoom.size}</div>
                <div><strong>Status:</strong> {activeModalRoom.rateNote}</div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalRoom(null)}
                  className="px-4 py-2 rounded text-xs font-cinzel uppercase text-slate-600 hover:text-black"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const r = activeModalRoom;
                    setActiveModalRoom(null);
                    onSelectRoomForInquiry(r);
                  }}
                  className="px-5 py-2.5 rounded bg-[#1B4B3B] text-white text-xs font-cinzel uppercase tracking-wider font-semibold shadow hover:bg-[#12382D]"
                >
                  Book Inquiry for this Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
