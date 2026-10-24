import React, { useState, useEffect } from 'react';
import { SAMPLE_ROOMS, RESORT_INFO, getWhatsAppUrl } from '../data/resortData';
import { BookingFormData, RoomItem } from '../types';
import { Calendar, Users, Phone, User, MessageSquare, CheckCircle, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';

interface BookingInquiryProps {
  initialPrefill?: Partial<BookingFormData>;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const BookingInquiry: React.FC<BookingInquiryProps> = ({
  initialPrefill,
  isModal = false,
  onCloseModal
}) => {
  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: '',
    checkOut: '',
    guests: 2,
    roomsCount: 1,
    selectedRoomId: SAMPLE_ROOMS[0]?.id || '',
    fullName: '',
    phone: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Sync initial prefill if passed
  useEffect(() => {
    if (initialPrefill) {
      setFormData((prev) => ({
        ...prev,
        ...initialPrefill
      }));
    }
  }, [initialPrefill]);

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number (at least 8 digits).';
    }

    if (!formData.checkIn) {
      newErrors.checkIn = 'Check-in date is required.';
    }

    if (!formData.checkOut) {
      newErrors.checkOut = 'Check-out date is required.';
    } else if (formData.checkIn && formData.checkOut <= formData.checkIn) {
      newErrors.checkOut = 'Check-out date must be after check-in date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const selectedRoomObj = SAMPLE_ROOMS.find((r) => r.id === formData.selectedRoomId);

  // Generate URL Encoded WhatsApp Message
  const constructWhatsAppMessage = (): string => {
    const lines = [
      'Assalam-o-Alaikum, I am submitting a booking inquiry for Husnain Resort, Mansehra.',
      '',
      `• Guest Name: ${formData.fullName.trim()}`,
      `• Contact Phone: ${formData.phone.trim()}`,
      `• Preferred Room: ${selectedRoomObj ? selectedRoomObj.name : 'General Inquiry'}`,
      `• Check-in Date: ${formData.checkIn || 'To be confirmed'}`,
      `• Check-out Date: ${formData.checkOut || 'To be confirmed'}`,
      `• Number of Guests: ${formData.guests}`,
      `• Rooms Needed: ${formData.roomsCount}`,
      formData.specialRequests.trim() ? `• Special Requests: ${formData.specialRequests.trim()}` : '',
      '',
      'Please confirm availability, rates, and booking procedure. Thank you!'
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(constructWhatsAppMessage());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleDirectWhatsAppClick = () => {
    const url = getWhatsAppUrl(constructWhatsAppMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      checkIn: '',
      checkOut: '',
      guests: 2,
      roomsCount: 1,
      selectedRoomId: SAMPLE_ROOMS[0]?.id || '',
      fullName: '',
      phone: '',
      specialRequests: ''
    });
    setErrors({});
  };

  return (
    <div className={isModal ? 'p-6 max-h-[90vh] overflow-y-auto' : 'py-20 bg-[#12382D] text-[#F7F5EF] relative'}>
      <div className={isModal ? 'max-w-2xl mx-auto' : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-[0.25em] font-cinzel text-[#C5A46D] font-bold block mb-2">
                Plan Your Stay
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                Send a Booking Inquiry
              </h2>
              <p className="text-sm text-[#DCE7D9]/80 max-w-xl mx-auto leading-relaxed">
                Submit your prospective travel dates and guest requirements. Our reception team will review and confirm current room availability and rates directly with you.
              </p>
              <div className="mt-3 text-[11px] text-[#C5A46D]/90 font-mono bg-black/20 inline-block px-3 py-1 rounded border border-white/10">
                Notice: Inquiries are confirmed directly by resort management. No immediate charges or automated payments.
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#C5A46D] font-semibold mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Check-in Date *</span>
                  </label>
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-[#F7F5EF] focus:outline-none focus:border-[#C5A46D] transition-colors"
                  />
                  {errors.checkIn && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.checkIn}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#C5A46D] font-semibold mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Check-out Date *</span>
                  </label>
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-[#F7F5EF] focus:outline-none focus:border-[#C5A46D] transition-colors"
                  />
                  {errors.checkOut && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.checkOut}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Guests & Rooms & Room Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#C5A46D] font-semibold mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Guests</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) || 1 })}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-[#F7F5EF] focus:outline-none focus:border-[#C5A46D]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num} className="bg-[#12382D] text-white">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#C5A46D] font-semibold mb-1.5">
                    Rooms Needed
                  </label>
                  <select
                    value={formData.roomsCount}
                    onChange={(e) => setFormData({ ...formData, roomsCount: parseInt(e.target.value, 10) || 1 })}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-[#F7F5EF] focus:outline-none focus:border-[#C5A46D]"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="bg-[#12382D] text-white">
                        {num} {num === 1 ? 'Room' : 'Rooms'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#C5A46D] font-semibold mb-1.5">
                    Room Preference
                  </label>
                  <select
                    value={formData.selectedRoomId}
                    onChange={(e) => setFormData({ ...formData, selectedRoomId: e.target.value })}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-[#F7F5EF] focus:outline-none focus:border-[#C5A46D]"
                  >
                    {SAMPLE_ROOMS.map((r) => (
                      <option key={r.id} value={r.id} className="bg-[#12382D] text-white">
                        {r.name}
                      </option>
                    ))}
                    <option value="any" className="bg-[#12382D] text-white">
                      Any Available Room
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 3: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#C5A46D] font-semibold mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tariq Mehmood"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-[#F7F5EF] focus:outline-none focus:border-[#C5A46D] placeholder-white/30"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#C5A46D] font-semibold mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contact Phone / WhatsApp *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-[#F7F5EF] focus:outline-none focus:border-[#C5A46D] placeholder-white/30"
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 4: Optional Message */}
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-wider text-[#C5A46D] font-semibold mb-1.5">
                  Special Inquiries or Estimated Arrival Time (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Traveling from Islamabad, arriving around 6 PM, need extra mattress for child..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full bg-black/30 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-[#F7F5EF] focus:outline-none focus:border-[#C5A46D] placeholder-white/30 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-lg bg-[#C5A46D] hover:bg-[#b59359] text-[#12382D] font-cinzel font-bold text-xs uppercase tracking-widest shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Review & Send Inquiry</span>
                </button>

                {isModal && onCloseModal && (
                  <button
                    type="button"
                    onClick={onCloseModal}
                    className="w-full sm:w-auto py-3.5 px-6 rounded-lg bg-white/10 hover:bg-white/20 text-[#F7F5EF] text-xs font-cinzel uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation & WhatsApp Transmission Card */
          <div className="bg-[#1B4B3B] border border-[#C5A46D]/40 rounded-2xl p-6 sm:p-8 text-center animate-fade-in shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase font-cinzel tracking-widest text-[#C5A46D] font-semibold block mb-1">
              Inquiry Summary Ready
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
              Thank You, {formData.fullName}!
            </h3>

            <p className="text-sm text-[#DCE7D9] max-w-lg mx-auto mb-6 leading-relaxed">
              Your inquiry details have been assembled. You can now send them directly to Husnain Resort via WhatsApp with one tap to receive live pricing and room availability.
            </p>

            {/* Assembled Details Preview */}
            <div className="bg-black/30 border border-white/10 rounded-xl p-4 text-left text-xs space-y-2 mb-6 max-w-lg mx-auto font-mono">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-[#C5A46D]">Room Preference:</span>
                <span className="text-white font-sans">{selectedRoomObj?.name || 'Standard Inquiry'}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-[#C5A46D]">Dates:</span>
                <span className="text-white font-sans">{formData.checkIn} to {formData.checkOut}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-[#C5A46D]">Guests & Rooms:</span>
                <span className="text-white font-sans">{formData.guests} Guest(s), {formData.roomsCount} Room(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C5A46D]">Contact Phone:</span>
                <span className="text-white font-sans">{formData.phone}</span>
              </div>
            </div>

            {/* Primary Action: Direct WhatsApp Dispatch */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-4">
              <button
                onClick={handleDirectWhatsAppClick}
                className="w-full py-3.5 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-102"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send via WhatsApp (0324 0307699)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                onClick={handleCopySummary}
                className="w-full sm:w-auto py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-[#F7F5EF] text-xs font-cinzel uppercase tracking-wider border border-white/20 flex items-center justify-center gap-2"
                title="Copy inquiry text"
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-[#DCE7D9]/70 pt-3 border-t border-white/10">
              <button
                onClick={resetForm}
                className="hover:text-white underline cursor-pointer"
              >
                Edit Inquiry Details
              </button>
              {isModal && onCloseModal && (
                <button
                  onClick={onCloseModal}
                  className="hover:text-white underline cursor-pointer"
                >
                  Close Window
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
