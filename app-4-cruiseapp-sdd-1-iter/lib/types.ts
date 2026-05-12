export type EventCategory = "show" | "pool" | "restaurant" | "excursion" | "sport" | "kids" | "music";

export interface CruiseEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: string;
  deck: number;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  day: "today" | "tomorrow";
  image?: string;
}

export type CabinType = "internal" | "window" | "balcony" | "suite";

export interface Cabin {
  id: string;
  number: string;
  type: CabinType;
  deck: number;
  price: number;
  capacity: number;
  available: boolean;
  amenities: string[];
}

export interface Deck {
  number: number;
  name: string;
  cabinCount: number;
}

export interface ShipInfo {
  name: string;
  currentPort: string;
  nextPort: string;
  weather: {
    temp: number;
    condition: string;
    icon: string;
  };
  shipTime: string;
  homeTime: string;
}

export interface BookingRequest {
  cabinId: string;
  cabinNumber: string;
  cabinType: CabinType;
  deck: number;
  price: number;
  guests: number;
  status: "draft" | "submitted";
}

export type ZoneType = "restaurant" | "bar" | "pool" | "theater" | "sport" | "kids" | "spa" | "shop" | "cabin" | "lobby";

export interface DeckZone {
  id: string;
  name: string;
  type: ZoneType;
  deck: number;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DeckMapData {
  deck: number;
  name: string;
  zones: DeckZone[];
}

export interface TerminalInfo {
  name: string;
  address: string;
  phone: string;
  checkInStart: string;
  checkInEnd: string;
  boarding: string;
  departure: string;
  coordinates: { lat: number; lng: number };
  whatToBring: string[];
  rules: string[];
}

export interface PublicTransportOption {
  name: string;
  route: string;
  price: string;
  frequency: string;
}

export interface TransportCar {
  description: string;
  parkingName: string;
  parkingAddress: string;
  pricePerDay: number;
  currency: string;
  notes: string;
  bookingAvailable: boolean;
}

export interface TransportTaxi {
  description: string;
  estimatedPrice: string;
  estimatedTime: string;
  notes: string;
  providers: string[];
}

export interface TransportPublic {
  description: string;
  options: PublicTransportOption[];
}

export interface TerminalData {
  terminal: TerminalInfo;
  transport: {
    car: TransportCar;
    taxi: TransportTaxi;
    publicTransport: TransportPublic;
  };
}

export interface TimeZoneInfo {
  shipTimezone: string;
  shipUtcOffset: number;
  homeTimezone: string;
  homeUtcOffset: number;
}
