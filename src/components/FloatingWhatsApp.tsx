import React, { useState, useEffect } from 'react';
import { getWhatsAppUrl, RESORT_INFO } from '../data/resortData';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowTooltip(true);
    }, 2000);

    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 animate-fade-in">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#12382D] text-[#F7F5EF] text-xs py-2 px-3.5 rounded-xl shadow-xl border border-[#C5A46D]/30 max-w-xs animate-slide-in">
          <span>
            Chat directly with Husnain Resort reception on WhatsApp
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/60 hover:text-white p-0.5 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Contact with Husnain Resort"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 border-2 border-white/20 group"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-105 transition-transform" />
      </a>
    </div>
  );
};
