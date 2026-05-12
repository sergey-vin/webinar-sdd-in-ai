export interface ShipStatus {
  shipName: string;
  currentLocation: string;
  shipTime: string;
  timezone: string;
  departurePort: string;
  departureTime: string;
  arrivalPort: string;
  arrivalTime: string;
  progress: number; // 0-100
  eta: string;
  speed: string;
  wind: string;
  seaState: string;
  dayOfTrip: number;
  totalDays: number;
  route: string;
}

export interface Event {
  id: string;
  title: string;
  time: string;
  endTime: string;
  category: EventCategory;
  location: string;
  description: string;
  isRecommended?: boolean;
}

export type EventCategory = "music" | "food" | "family" | "shops" | "spa" | "show";

export interface JourneyLeg {
  id: string;
  time: string;
  timezone: string;
  mode: "plane" | "ship" | "tram" | "walk" | "bed" | "bus" | "taxi";
  title: string;
  detail: string;
  status: "done" | "active" | "upcoming";
}

export interface OnboardVenue {
  id: string;
  title: string;
  location: string;
  icon: string;
  time?: string;
  isActive?: boolean;
}

export interface Deck {
  id: string;
  number: number;
  name: string;
  cabins: Cabin[];
}

export interface Cabin {
  id: string;
  number: string;
  type: CabinType;
  deckId: string;
  price: number;
  available: boolean;
  size: string;
  description: string;
}

export type CabinType = "internal" | "window" | "balcony" | "suite";

export interface CabinTypeInfo {
  type: CabinType;
  label: string;
  description: string;
  priceFrom: number;
  icon: string;
  available: number;
}
