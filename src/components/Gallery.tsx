import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES } from '../data/resortData';
import { GalleryImage } from '../types';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon, Info } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Views' },
    { id: 'grounds', label: 'Gardens & Grounds' },
    { id: 'rooms', label: 'Room Concepts' },
    { id: 'architecture', label: 'Architecture & Ambiance' },
    { id: 'scenery', label: 'Hazara Landscapes' }
  ];

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    if (activeCategory === 'all') return true;
    return img.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredImages.length - 1));
  }, [lightboxIndex, filteredImages.length]);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < filteredImages.length - 1 ? prev! + 1 : 0));
  }, [lightboxIndex, filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, prevImage, nextImage]);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#12382D] text-[#F7F5EF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#C5A46D] font-bold mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Visual Showcase</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Resort Atmosphere & Surroundings
          </h2>

          <p className="text-base text-[#DCE7D9]/80 leading-relaxed font-light mb-6">
            A curated photographic tour reflecting serene accommodations, mountain vistas, and verdant retreat grounds.
          </p>

          {/* Owner Photography Note */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-xs text-[#DCE7D9] font-mono">
            <Info className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span>
              <strong>Owner Note:</strong> These high-resolution visual placeholders can be instantly swapped with authentic on-site photographs of Husnain Resort.
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center items-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-cinzel uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#C5A46D] text-[#12382D] font-bold shadow-md'
                  : 'bg-white/10 text-[#F7F5EF]/80 hover:bg-white/20 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] cursor-pointer bg-black/40 border border-white/10"
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Caption and Expand Icon */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-full bg-black/60 text-[#C5A46D] backdrop-blur-xs">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-sm font-semibold text-white mb-0.5">
                    {img.title}
                  </h4>
                  <p className="text-[11px] text-[#DCE7D9]/80 line-clamp-1 font-light">
                    {img.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-xs animate-fade-in">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image and Caption */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center">
            <img
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].alt}
              className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center">
              <h3 className="font-serif text-lg text-white font-semibold">
                {filteredImages[lightboxIndex].title}
              </h3>
              <p className="text-xs text-[#DCE7D9]/80 max-w-lg mx-auto mt-1 font-light">
                {filteredImages[lightboxIndex].caption}
              </p>
              <span className="text-[11px] font-mono text-[#C5A46D] mt-2 block">
                {lightboxIndex + 1} of {filteredImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
