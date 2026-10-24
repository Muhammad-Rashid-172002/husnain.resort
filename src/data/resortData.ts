import { RoomItem, GalleryImage, FacilityItem, FAQItem } from '../types';

export const RESORT_INFO = {
  name: 'Husnain Resort',
  tagline: 'Find Your Peace in Mansehra',
  fullAddress: 'Husnain Resort, SRSP Link Road, Near Shahnawaz Chowk, Mansehra, KPK, Pakistan, 21300',
  city: 'Mansehra',
  province: 'Khyber Pakhtunkhwa (KPK)',
  postalCode: '21300',
  landmark: 'Near Shahnawaz Chowk, SRSP Link Road',
  phoneDisplay: '0324 0307699',
  phoneTel: 'tel:+923240307699',
  phoneInternational: '+923240307699',
  whatsappNumber: '923240307699',
  mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Husnain+Resort%2C+SRSP+Link+Rd%2C+Near+Shahnawaz+Chowk%2C+Mansehra+21300+Pakistan',
  tripadvisorUrl: 'https://www.tripadvisor.com/Hotel_Review-g1967069-d23509410-Reviews-Husnain_Resort-Khyber_Pakhtunkhwa_Province_Mansehra.html?m=69767',
  agencyCredit: 'KorvenzaTech',
  agencyUrl: 'https://korvenzatech.com'
};

/**
 * Helper to construct WhatsApp click-to-chat URL with properly URL-encoded message
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultText = 'Assalam-o-Alaikum, I am interested in staying at Husnain Resort, Mansehra. Please share your available room types, rates, and booking details.';
  const text = customMessage || defaultText;
  return `https://wa.me/${RESORT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Sample Room Concepts (Clearly designated as Demo Content pending owner confirmation)
 */
export const SAMPLE_ROOMS: RoomItem[] = [
  {
    id: 'deluxe-king',
    name: 'Deluxe Pine King Room',
    category: 'Luxury Solo & Couples',
    tagline: 'Quiet comfort framed by verdant garden vistas',
    description: 'Designed for peaceful rest after traveling through the Hazara hills. Features handcrafted wooden accents, natural daylight, and a restful seating nook.',
    capacity: '2 Guests',
    bedConfig: '1 King-size Bed',
    size: '340 sq. ft.',
    amenities: ['En-suite Bathroom', 'High-Speed Wi-Fi', 'Warm Water Supply', 'Seating Lounge', 'Quiet Mountain Setting'],
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    isDemoConcept: true,
    rateNote: 'Contact resort for current rates and seasonal availability'
  },
  {
    id: 'executive-family-suite',
    name: 'Executive Family Suite',
    category: 'Family & Groups',
    tagline: 'Spacious multi-bed haven for family getaways and holiday groups',
    description: 'Ample space for parents, children, or traveling groups exploring Mansehra and Karakoram highway routes. Includes a dedicated family seating area.',
    capacity: '4 - 5 Guests',
    bedConfig: '2 Queen Beds + Optional Daybed',
    size: '560 sq. ft.',
    amenities: ['Spacious Family Layout', 'Private Bathroom', 'Tea / Coffee Station', 'Lounge Seating', 'Balcony / Garden Outlook'],
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    isDemoConcept: true,
    rateNote: 'Contact resort for group and family package rates'
  },
  {
    id: 'scenic-twin',
    name: 'Twin Panorama Room',
    category: 'Friends & Tour Partners',
    tagline: 'Flexible twin arrangement with pleasant fresh air ventilation',
    description: 'Ideal for friends or business colleagues stopping over in Mansehra. Thoughtfully equipped with twin beds, dedicated reading lamps, and modern cleanliness.',
    capacity: '2 - 3 Guests',
    bedConfig: '2 Single Twin Beds',
    size: '320 sq. ft.',
    amenities: ['Twin Beds', 'Work / Dressing Desk', 'Attached Bath', 'Wi-Fi Access', 'Direct Garden Access'],
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
    isDemoConcept: true,
    rateNote: 'Contact resort for verified bed setups and pricing'
  },
  {
    id: 'garden-terrace-suite',
    name: 'Garden Terrace Suite',
    category: 'Premium Retreat',
    tagline: 'Private terrace opening directly onto lush greenery',
    description: 'Step directly outside to breathe in the crisp morning air of Mansehra. A tranquil sanctuary designed for rest, contemplation, and peaceful conversations.',
    capacity: '2 Guests',
    bedConfig: '1 Super King Bed',
    size: '420 sq. ft.',
    amenities: ['Private Garden Terrace', 'Premium Bed Linens', 'En-suite Luxury Bath', 'Panoramic Glass Windows', 'In-room Dining Option'],
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
    isDemoConcept: true,
    rateNote: 'Contact resort for suite rates and advance reservations'
  }
];

/**
 * Resort Facilities (Honoring fact boundaries: clearly marking pending owner confirmations)
 */
export const RESORT_FACILITIES: FacilityItem[] = [
  {
    id: 'parking',
    title: 'Secure Vehicle Parking',
    description: 'On-site vehicle parking for guests traveling by car or private transport along the SRSP Link Road.',
    iconName: 'Car',
    status: 'confirmed',
    category: 'Arrival & Convenience'
  },
  {
    id: 'reception',
    title: 'Welcoming Front Desk & Assistance',
    description: 'Direct reception assistance to welcome guests, facilitate check-in, and answer local inquiries.',
    iconName: 'ShieldCheck',
    status: 'confirmed',
    category: 'Hospitality'
  },
  {
    id: 'gardens',
    title: 'Open Garden Grounds & Courtyard',
    description: 'Pleasant landscaped lawns and open spaces to sit outdoors and enjoy the gentle mountain breeze.',
    iconName: 'Trees',
    status: 'pending_verification',
    category: 'Grounds'
  },
  {
    id: 'wifi',
    title: 'Wi-Fi Connectivity',
    description: 'Stay connected with family and colleagues during your stay in Mansehra.',
    iconName: 'Wifi',
    status: 'pending_verification',
    category: 'Amenities'
  },
  {
    id: 'dining',
    title: 'Dining & Refreshments',
    description: 'Fresh local cuisine and hot tea service for staying guests (specific menu options pending owner verification).',
    iconName: 'Utensils',
    status: 'pending_verification',
    category: 'Dining'
  },
  {
    id: 'family-rooms',
    title: 'Family & Group Accommodations',
    description: 'Configurable rooms suited for family travel and northern KPK road trip stops.',
    iconName: 'Users',
    status: 'pending_verification',
    category: 'Stay'
  },
  {
    id: 'hot-water',
    title: '24/7 Water Supply & Heating',
    description: 'Reliable water supply and seasonal hot water heating for comfortable guest rest.',
    iconName: 'Flame',
    status: 'pending_verification',
    category: 'Comfort'
  },
  {
    id: 'events',
    title: 'Lawn & Event Arrangements',
    description: 'Space for gatherings, family reunions, and private celebrations upon prior inquiry.',
    iconName: 'Sparkles',
    status: 'pending_verification',
    category: 'Events'
  }
];

/**
 * Gallery Images with descriptive alt text and category tags
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g-1',
    title: 'Resort Architecture & Grounds',
    category: 'architecture',
    caption: 'Lush greenery and architectural charm in the heart of Mansehra (Concept visual).',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Husnain Resort exterior grounds and surrounding green trees'
  },
  {
    id: 'g-2',
    title: 'Serene Pine Valley Surroundings',
    category: 'scenery',
    caption: 'The inspiring mountainous landscape of Mansehra and Hazara division.',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Mountain ridge landscape near Mansehra'
  },
  {
    id: 'g-3',
    title: 'Warm & Restful Bed Chambers',
    category: 'rooms',
    caption: 'Clean, comfortable bedding prepared for peaceful sleep (Sample room concept).',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cozy and spacious resort bedroom with wooden details'
  },
  {
    id: 'g-4',
    title: 'Open Garden Courtyard',
    category: 'grounds',
    caption: 'Quiet pathways and manicured lawns for evening tea and fresh air.',
    url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Resort garden walkway surrounded by pines'
  },
  {
    id: 'g-5',
    title: 'Warm Hospitality & Seating',
    category: 'rooms',
    caption: 'Thoughtful relaxation areas designed for guests after lengthy road journeys.',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Interior lounge and suite sitting area'
  },
  {
    id: 'g-6',
    title: 'Evening Ambiance & Lanterns',
    category: 'architecture',
    caption: 'Golden lighting illuminating the resort pavilion as twilight settles over KPK.',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    alt: 'Night resort lighting with golden illumination'
  },
  {
    id: 'g-7',
    title: 'Hazara Hills & Pine Vistas',
    category: 'scenery',
    caption: 'Natural hillsides of KPK providing cool breezes and a calm escape.',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    alt: 'Pine hills and misty mountain horizon'
  },
  {
    id: 'g-8',
    title: 'Morning Light on Private Balcony',
    category: 'grounds',
    caption: 'Starting the day with mountain tea in quiet contemplation.',
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sunlit balcony overlooking greenery'
  }
];

/**
 * Frequently Asked Questions
 */
export const FAQS: FAQItem[] = [
  {
    question: 'Where exactly is Husnain Resort located in Mansehra?',
    answer: 'Husnain Resort is situated on SRSP Link Road, Near Shahnawaz Chowk, Mansehra, Khyber Pakhtunkhwa (postal code 21300). It offers convenient access whether you are visiting Mansehra city or passing through on your way to Abbottabad, Naran, or the Karakoram highway.'
  },
  {
    question: 'How do I check room availability and rates?',
    answer: 'Room rates and current availability are updated directly with resort management. Please tap our "Send Booking Inquiry" button or contact our team directly via WhatsApp at 0324 0307699 to receive prompt confirmation of room categories and seasonal rates.'
  },
  {
    question: 'Can I send a booking inquiry directly via WhatsApp?',
    answer: 'Yes! You can choose your desired check-in/out dates, guest count, and room preference on our website. Tapping the WhatsApp button prepares a formatted message ready to send straight to the resort number.'
  },
  {
    question: 'What are the standard check-in and check-out timings?',
    answer: 'Standard check-in and check-out times should be confirmed upon booking inquiry. If you have late arrival or early departure needs during your road trip, please inform the management via WhatsApp in advance.'
  },
  {
    question: 'Is parking available on site for private vehicles?',
    answer: 'Yes, on-site vehicle parking is available for guests staying at Husnain Resort.'
  },
  {
    question: 'What facilities are available at the resort?',
    answer: 'The resort provides accommodation with secure parking and front desk assistance. Additional features such as Wi-Fi, dining, and lawn spaces are configurable—please consult our reception team via WhatsApp for any special requirements during your dates.'
  },
  {
    question: 'Is Husnain Resort suitable for family travel?',
    answer: 'Yes, the resort welcomes families and groups visiting Mansehra. We offer spacious room configurations and a peaceful environment away from heavy traffic.'
  }
];

/**
 * Experiences & Destination Highlights
 */
export const EXPERIENCES_DATA = [
  {
    id: 'serenity',
    title: 'A Tranquil Foothill Haven',
    kicker: 'Peace & Serenity',
    description: 'Nestled near Shahnawaz Chowk along the SRSP Link Road, Husnain Resort provides a peaceful sanctuary to unwind. The soothing mountain air and calm ambiance make it a preferred respite for road travelers and families alike.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Crisp mountain breezes', 'Calm environment away from city rush', 'Quiet garden spaces for relaxation']
  },
  {
    id: 'gateway',
    title: 'Strategic Gateway to Hazara & Karakoram',
    kicker: 'Regional Exploration',
    description: 'Mansehra serves as the historic crossroads of northern Pakistan. From here, travelers can easily plan excursions toward Kaghan Valley, Balakot, Shinkiari tea gardens, Abbottabad, or onward along the Karakoram Highway.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Central starting hub for northern tours', 'Comfortable overnight rest stop', 'Seamless highway connectivity']
  },
  {
    id: 'gatherings',
    title: 'Hospitality for Families & Gatherings',
    kicker: 'Warm Hospitality',
    description: 'True to the hospitable spirit of Khyber Pakhtunkhwa, every guest is welcomed with warmth and attentive care. Relax together in garden courtyards, share evening tea, and create lasting memories.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Family-friendly atmosphere', 'Spacious room options', 'Personalized reception attention']
  }
];
