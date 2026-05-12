/** App-level TypeScript interfaces for CUThere domain objects. */

export interface Profile {
  id: string;
  display_name: string;
  email: string;
  avatar_url: string | null;
  locale: "en" | "ru";
  home_timezone: string;
  club_tier: "blue" | "silver" | "gold" | "platinum";
  club_points: number;
  club_card_no: string | null;
}

export interface Carrier {
  id: string;
  code: string;
  name_en: string;
  name_ru: string;
  mode: TransportMode;
  logo_url: string | null;
  color: string | null;
}

export type TransportMode = "ferry" | "flight" | "bus" | "train" | "metro";

export type LocationType = "port" | "airport" | "station" | "stop";

export interface Location {
  id: string;
  code: string;
  name_en: string;
  name_ru: string;
  city_en: string;
  city_ru: string;
  country: string;
  lat: number | null;
  lng: number | null;
  timezone: string;
  loc_type: LocationType;
}

export interface Vessel {
  id: string;
  carrier_id: string;
  name: string;
  ship_class: string | null;
  deck_count: number;
  pax_capacity: number | null;
}

export interface Deck {
  id: string;
  vessel_id: string;
  deck_number: number;
  name_en: string;
  name_ru: string;
  svg_path: string | null;
}

export type VenueCategory =
  | "restaurant"
  | "bar"
  | "pool"
  | "theater"
  | "spa"
  | "shop"
  | "gym"
  | "lounge"
  | "cabin_area"
  | "other";

export interface Venue {
  id: string;
  deck_id: string;
  name_en: string;
  name_ru: string;
  category: VenueCategory;
  svg_zone_id: string | null;
  x: number | null;
  y: number | null;
}

export interface Route {
  id: string;
  carrier_id: string;
  vessel_id: string | null;
  origin_id: string;
  destination_id: string;
  route_code: string;
  mode: TransportMode;
  duration_min: number;
  base_price_eur: number | null;
  frequency: string | null;
}

export type TripStatus = "upcoming" | "active" | "completed";

export interface Trip {
  id: string;
  user_id: string;
  title_en: string;
  title_ru: string;
  status: TripStatus;
  start_date: string;
  end_date: string;
}

export type LegStatus =
  | "scheduled"
  | "check_in_open"
  | "boarding"
  | "in_transit"
  | "arrived"
  | "cancelled";

export interface TripLeg {
  id: string;
  trip_id: string;
  route_id: string;
  leg_order: number;
  departure_time: string;
  arrival_time: string;
  status: LegStatus;
  seat_info: string | null;
  booking_ref: string | null;
  qr_data: string | null;
}

export type EventCategory =
  | "show"
  | "dining"
  | "excursion"
  | "sport"
  | "wellness"
  | "kids"
  | "music"
  | "other";

export interface EventItem {
  id: string;
  vessel_id: string | null;
  location_id: string | null;
  venue_id: string | null;
  title_en: string;
  title_ru: string;
  description_en: string | null;
  description_ru: string | null;
  category: EventCategory;
  start_time: string;
  end_time: string;
  image_url: string | null;
  venue?: {
    name_en: string;
    name_ru: string;
    deck: { deck_number: number; name_en: string; name_ru: string } | null;
  } | null;
}

export interface ClubPerk {
  id: string;
  tier: "blue" | "silver" | "gold" | "platinum";
  perk_en: string;
  perk_ru: string;
  icon: string | null;
}

/** Joined types for UI convenience */
export interface TripLegWithDetails extends TripLeg {
  route: Route & {
    carrier: Carrier;
    origin: Location;
    destination: Location;
    vessel: Vessel | null;
  };
}
