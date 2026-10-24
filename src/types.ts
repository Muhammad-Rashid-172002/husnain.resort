export interface RoomItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  capacity: string;
  bedConfig: string;
  size: string;
  amenities: string[];
  imageUrl: string;
  isDemoConcept: boolean;
  rateNote: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'all' | 'grounds' | 'rooms' | 'architecture' | 'scenery';
  caption: string;
  url: string;
  alt: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  status: 'confirmed' | 'pending_verification';
  category: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomsCount: number;
  selectedRoomId: string;
  fullName: string;
  phone: string;
  specialRequests: string;
}
