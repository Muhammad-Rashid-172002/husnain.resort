import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Rooms } from './components/Rooms';
import { ThreeResortViewer } from './components/ThreeResortViewer';
import { Experiences } from './components/Experiences';
import { Facilities } from './components/Facilities';
import { Gallery } from './components/Gallery';
import { BookingInquiry } from './components/BookingInquiry';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { RoomItem, BookingFormData } from './types';
import { Sparkles, Box, X, Compass, ExternalLink } from 'lucide-react';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFullscreen3DOpen, setIsFullscreen3DOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<Partial<BookingFormData>>({});

  const handleOpenBooking = (prefill?: Partial<BookingFormData>) => {
    if (prefill) {
      setBookingPrefill(prefill);
    }
    setIsBookingModalOpen(true);
  };

  const handleSelectRoomForInquiry = (room: RoomItem) => {
    setBookingPrefill({
      selectedRoomId: room.id
    });
    // Scroll smoothly to in-page booking inquiry section
    const bookingElem = document.getElementById('booking');
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#202923] flex flex-col font-sans selection:bg-[#1B4B3B] selection:text-[#F7F5EF]">
      {/* Sticky Header Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Cinematic Hero Section */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 2. Editorial About Section */}
        <About />

        {/* 3. Rooms & Accommodation Concepts */}
        <Rooms onSelectRoomForInquiry={handleSelectRoomForInquiry} />

        {/* 4. Three.js Procedural 3D Experience (per Three.js Skill) */}
        <section id="3d-experience" className="py-20 sm:py-28 bg-[#12382D] text-[#F7F5EF] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-cinzel text-[#C5A46D] font-bold mb-3">
                <Box className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Interactive 3D Architecture</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Explore the Resort Pavilion in 3D
              </h2>

              <p className="text-sm sm:text-base text-[#DCE7D9]/85 max-w-2xl mx-auto leading-relaxed font-light">
                Interact with an architectural 3D study of Husnain Resort. Rotate around the timber veranda, inspect alpine pitched gables, and switch between daylight, golden sunset, and lantern-lit twilight.
              </p>
            </div>

            {/* Embedded Three.js Viewer Canvas */}
            <div className="max-w-5xl mx-auto">
              <ThreeResortViewer onToggleExpand={() => setIsFullscreen3DOpen(true)} />
            </div>

            <div className="mt-4 text-center">
              <span className="text-[11px] font-mono text-[#C5A46D]/80">
                Crafted with Three.js • PBR Studio Environment • Procedural Wood & Stone Finishes
              </span>
            </div>
          </div>
        </section>

        {/* 5. Hazara & Mansehra Experiences */}
        <Experiences />

        {/* 6. Facilities & Amenities */}
        <Facilities />

        {/* 7. Gallery Section with Lightbox */}
        <Gallery />

        {/* 8. Functional Booking Inquiry Panel */}
        <div id="booking">
          <BookingInquiry initialPrefill={bookingPrefill} />
        </div>

        {/* 9. Reviews & Trust Section (Tripadvisor link) */}
        <ReviewsSection />

        {/* 10. Location, Address & Directions */}
        <LocationSection />

        {/* 11. Frequently Asked Questions Accordion */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Booking Modal (Triggered by 'Plan Your Stay' or Room cards) */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div className="relative bg-[#12382D] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#C5A46D]/30">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Booking Dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <BookingInquiry
              isModal={true}
              initialPrefill={bookingPrefill}
              onCloseModal={() => setIsBookingModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Fullscreen 3D Viewer Modal */}
      {isFullscreen3DOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#12382D] animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#12382D] text-[#F7F5EF] z-20">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-[#C5A46D]" />
              <span className="font-cinzel text-sm uppercase tracking-wider font-bold">
                Husnain Resort — Fullscreen 3D Architectural Viewer
              </span>
            </div>
            <button
              onClick={() => setIsFullscreen3DOpen(false)}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 text-xs font-cinzel uppercase tracking-wider"
            >
              <X className="w-4 h-4" />
              <span>Close Fullscreen</span>
            </button>
          </div>
          <div className="flex-1 w-full h-full relative">
            <ThreeResortViewer isStandalone={true} onToggleExpand={() => setIsFullscreen3DOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
