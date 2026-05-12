export interface Port {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  arrivalTime?: string;
  departureTime?: string;
  day: number;
  timezone: string;
  utcOffset: number; // hours from UTC
}

export interface CabinCategory {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  amenities: string[];
  image: string;
  available: number;
}

export interface Cruise {
  id: string;
  name: string;
  shipName: string;
  description: string;
  image: string;
  duration: number; // nights
  region: string;
  ports: Port[];
  cabins: CabinCategory[];
  departureDate: string;
  returnDate: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
}

export interface Booking {
  id: string;
  cruiseId: string;
  cabinCategoryId: string;
  cabinNumber: string;
  guestName: string;
  guestEmail: string;
  guests: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
  bookingDate: string;
}

export interface DeckVenue {
  id: string;
  name: string;
  type: "restaurant" | "bar" | "pool" | "theater" | "spa" | "gym" | "shop" | "cabin" | "kids" | "lounge";
  deck: number;
  x: number; // percentage position on deck map
  y: number;
  width: number;
  height: number;
  description: string;
  openHours?: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  category: "show" | "sport" | "food" | "kids" | "music" | "wellness" | "social";
  venue: string;
  deck: number;
  startTime: string; // HH:mm
  endTime: string;
  day: number;
  image?: string;
}

export interface TransferOption {
  id: string;
  type: "car" | "taxi" | "shuttle" | "public";
  name: string;
  description: string;
  priceRange: string;
  details: string[];
  tips: string[];
}

export interface ParkingOption {
  id: string;
  name: string;
  address: string;
  pricePerDay: number;
  distanceToTerminal: string;
  shuttle: boolean;
  covered: boolean;
}
