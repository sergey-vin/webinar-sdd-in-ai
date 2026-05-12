import type { TimelineEvent, OnboardActivity, ScheduleEvent, ShipDestination, DeckRoom } from "./types";

export const tripTimeline: TimelineEvent[] = [
  { done: true, time: "Wed 19:42", zone: "CET", mode: "plane", title: "Berlin BER → Helsinki HEL", detail: "Finnair AY 1432 · Seat 14F · Landed on time" },
  { done: true, time: "Thu 09:00", zone: "EET", mode: "bed", title: "Hotel Klaus K, Helsinki", detail: "Checked out · 1 night" },
  { done: true, time: "Thu 10:00", zone: "EET", mode: "tram", title: "Tram 6 to Länsiterminaali", detail: "Mannerheimintie · 14 min · €3.10" },
  { active: true, time: "Thu 10:30 → 12:30", zone: "EET", mode: "ship", title: "MS Megastar · Helsinki → Tallinn", detail: "Cabin not booked · Deck 7 lounge access" },
  { time: "Thu 13:00", zone: "EET", mode: "walk", title: "Walk to Old Town", detail: "Sadama → Viru Square · 14 min" },
  { time: "Thu 14:00", zone: "EET", mode: "bed", title: "Telegraaf Hotel", detail: "Check-in · 3 nights", last: true },
];

export const onboardActivities: OnboardActivity[] = [
  { icon: "utensils", title: "Sea Pub", sub: "Live music · 11:15", badge: "In 33 min" },
  { icon: "utensils", title: "Coffee & Co", sub: "Deck 7 · Open", badge: "Now", accent: true },
  { icon: "sparkles", title: "Spa & Sauna", sub: "Deck 8" },
  { icon: "music", title: "Starlight Bar", sub: "Karaoke · 21:00" },
];

export const scheduleEvents: ScheduleEvent[] = [
  { time: "10:00", dur: "120 min", title: "Sea Pub — Live acoustic", loc: "Deck 6 · Bow", icon: "music", type: "music" },
  { time: "10:30", dur: "30 min", title: "Kids drawing class", loc: "Deck 8 · Playroom", icon: "baby", type: "family" },
  { time: "11:00", dur: "90 min", title: "Tax-free shopping opens", loc: "Deck 7 · Midship", icon: "shopping-bag", type: "shops" },
  { time: "11:15", dur: "45 min", title: "Trio Aalto — jazz set", loc: "Sea Pub · Deck 6", icon: "music", type: "music", highlight: true },
  { time: "11:30", dur: "60 min", title: "Brunch · Buffet Marina", loc: "Deck 7 · Aft", icon: "utensils", type: "food" },
  { time: "11:30", dur: "45 min", title: "Sauna & cold plunge", loc: "Deck 8 · Spa area", icon: "sparkles", type: "spa" },
  { time: "12:00", dur: "15 min", title: "Arrival announcement", loc: "All decks · PA", icon: "bell", type: "info" },
  { time: "12:30", dur: "—", title: "Disembark · Tallinn D-Terminal", loc: "Deck 4 · Vehicle deck above", icon: "anchor", type: "arrive", anchor: true },
];

// Per-deck data: rooms, destinations, deck stats
export interface DeckData {
  rooms: DeckRoom[];
  youAreHerePos?: { cx: number; cy: number };
  destinations: ShipDestination[];
  stats: { venues: number; venueLabel: string; shops: number; shopLabel: string };
}

export const deckLayouts: Record<number, DeckData> = {
  10: {
    rooms: [
      { x: 80, y: 48, w: 120, h: 60, label: "Sun Deck", sub: "Open air" },
      { x: 210, y: 48, w: 80, h: 60, label: "Pool", highlighted: true },
      { x: 80, y: 140, w: 80, h: 60, label: "Hot tub" },
      { x: 170, y: 140, w: 60, h: 60, label: "Bar", sub: "Drinks" },
      { x: 240, y: 140, w: 60, h: 60, label: "Stairs", small: true },
    ],
    destinations: [
      { icon: "sparkles", title: "Pool area", sub: "Deck 10 · Open top", eta: "5 min" },
      { icon: "utensils", title: "Sky Bar", sub: "Deck 10 · Aft", eta: "6 min" },
    ],
    stats: { venues: 2, venueLabel: "Pool & bar", shops: 0, shopLabel: "None" },
  },
  9: {
    rooms: [
      { x: 50, y: 48, w: 90, h: 60, label: "Casino", sub: "Slots & tables" },
      { x: 150, y: 48, w: 70, h: 60, label: "Nightclub" },
      { x: 230, y: 48, w: 80, h: 60, label: "VIP Lounge", highlighted: true },
      { x: 50, y: 140, w: 70, h: 60, label: "WC", small: true },
      { x: 130, y: 140, w: 90, h: 60, label: "Karaoke Bar" },
      { x: 230, y: 140, w: 80, h: 60, label: "Stairs", small: true },
    ],
    destinations: [
      { icon: "music", title: "Casino Floor", sub: "Deck 9 · Midship", eta: "4 min" },
      { icon: "sparkles", title: "VIP Lounge", sub: "Deck 9 · Bow · Members only", eta: "5 min" },
    ],
    stats: { venues: 4, venueLabel: "Entertainment", shops: 0, shopLabel: "None" },
  },
  8: {
    rooms: [
      { x: 50, y: 48, w: 90, h: 60, label: "Spa", sub: "Sauna & pool", highlighted: true },
      { x: 150, y: 48, w: 60, h: 60, label: "Gym" },
      { x: 220, y: 48, w: 50, h: 60, label: "WC", small: true },
      { x: 280, y: 48, w: 40, h: 28, label: "8201", small: true },
      { x: 280, y: 80, w: 40, h: 28, label: "8202", small: true },
      { x: 50, y: 140, w: 60, h: 60, label: "Cabins", sub: "8210-8220" },
      { x: 120, y: 140, w: 70, h: 60, label: "Cabin 8217", youAreHere: false },
      { x: 200, y: 140, w: 60, h: 60, label: "Cabins", sub: "8230-8240" },
      { x: 270, y: 140, w: 60, h: 60, label: "Stairs", small: true },
    ],
    destinations: [
      { icon: "sparkles", title: "Spa Atlantis", sub: "Deck 8 · Bow · Open now", eta: "1 min" },
      { icon: "bed-double", title: "Cabin 8217", sub: "Deck 8 · Midship", eta: "2 min" },
    ],
    stats: { venues: 2, venueLabel: "Spa & Gym", shops: 0, shopLabel: "None" },
  },
  7: {
    rooms: [
      { x: 50, y: 48, w: 70, h: 60, label: "Sea Pub", sub: "Live music" },
      { x: 130, y: 48, w: 50, h: 60, label: "Café" },
      { x: 190, y: 48, w: 70, h: 60, label: "Buffet", highlighted: true },
      { x: 270, y: 48, w: 60, h: 60, label: "Shops" },
      { x: 50, y: 140, w: 50, h: 60, label: "WC", small: true },
      { x: 110, y: 140, w: 70, h: 60, label: "Lounge", youAreHere: true },
      { x: 190, y: 140, w: 70, h: 60, label: "Info", small: true },
      { x: 270, y: 140, w: 60, h: 60, label: "Stairs", small: true },
    ],
    youAreHerePos: { cx: 145, cy: 170 },
    destinations: [
      { icon: "utensils", title: "Buffet Marina", sub: "Deck 7 · 38 m · 1 staircase", eta: "2 min" },
      { icon: "sparkles", title: "Spa Atlantis", sub: "Deck 8 · take elevator A", eta: "4 min" },
      { icon: "bed-double", title: "Cabin 8217", sub: "Deck 8 · 12 m from elevator", eta: "3 min" },
    ],
    stats: { venues: 6, venueLabel: "Bars & food", shops: 3, shopLabel: "Tax-free" },
  },
  6: {
    rooms: [
      { x: 50, y: 48, w: 100, h: 60, label: "Sea Pub", sub: "Stage area", highlighted: true },
      { x: 160, y: 48, w: 80, h: 60, label: "Whisky Bar" },
      { x: 250, y: 48, w: 70, h: 60, label: "Traveller" },
      { x: 50, y: 140, w: 60, h: 60, label: "WC", small: true },
      { x: 120, y: 140, w: 80, h: 60, label: "Wine Bar", sub: "Sommelier" },
      { x: 210, y: 140, w: 60, h: 60, label: "Burger" },
      { x: 280, y: 140, w: 50, h: 60, label: "Stairs", small: true },
    ],
    destinations: [
      { icon: "music", title: "Sea Pub Stage", sub: "Deck 6 · Bow · Live now", eta: "3 min" },
      { icon: "utensils", title: "Whisky Bar", sub: "Deck 6 · Midship", eta: "4 min" },
    ],
    stats: { venues: 5, venueLabel: "Bars & dining", shops: 1, shopLabel: "Traveller shop" },
  },
  5: {
    rooms: [
      { x: 50, y: 48, w: 80, h: 60, label: "Cabins", sub: "5101-5120" },
      { x: 140, y: 48, w: 80, h: 60, label: "Cabins", sub: "5121-5140" },
      { x: 230, y: 48, w: 80, h: 60, label: "Cabins", sub: "5141-5160" },
      { x: 50, y: 140, w: 80, h: 60, label: "Cabins", sub: "5201-5220" },
      { x: 140, y: 140, w: 60, h: 60, label: "Laundry", small: true },
      { x: 210, y: 140, w: 60, h: 60, label: "Medical", small: true, highlighted: true },
      { x: 280, y: 140, w: 50, h: 60, label: "Stairs", small: true },
    ],
    destinations: [
      { icon: "bed-double", title: "Medical Center", sub: "Deck 5 · Aft · 24h", eta: "5 min" },
    ],
    stats: { venues: 0, venueLabel: "Cabins only", shops: 0, shopLabel: "None" },
  },
  4: {
    rooms: [
      { x: 50, y: 48, w: 120, h: 60, label: "Vehicle deck", sub: "Cars & trucks" },
      { x: 180, y: 48, w: 80, h: 60, label: "Ramp", sub: "Entry/exit" },
      { x: 270, y: 48, w: 60, h: 60, label: "Crew", small: true },
      { x: 50, y: 140, w: 100, h: 60, label: "Vehicle deck", sub: "Overflow" },
      { x: 160, y: 140, w: 80, h: 60, label: "Luggage", highlighted: true },
      { x: 250, y: 140, w: 80, h: 60, label: "Stairs", small: true },
    ],
    destinations: [
      { icon: "utensils", title: "Luggage storage", sub: "Deck 4 · Near ramp", eta: "6 min" },
    ],
    stats: { venues: 0, venueLabel: "Vehicle deck", shops: 0, shopLabel: "None" },
  },
};

export const tzLabels: Record<string, string> = {
  ship: "Ship time · UTC+3",
  local: "Local · UTC+2",
  home: "Home (Berlin) · UTC+1",
};

export const tzOffsets: Record<string, number> = {
  ship: 0,
  local: -1,
  home: -2,
};

// Schedule chip filter mapping
export const chipFilterMap: Record<string, string[]> = {
  "All": [],
  "Music": ["music"],
  "Food & bars": ["food"],
  "Family": ["family"],
  "Shops": ["shops"],
  "Spa": ["spa"],
};

// ─── Search & Compare ───
export interface SearchResult {
  mode: "ferry" | "plane";
  carrier: string;
  dep: string;
  arr: string;
  dur: string;
  price: number;
  badge?: string;
  co2: string;
  from: string;
  to: string;
}

export const searchResults: SearchResult[] = [
  { mode: "ferry", carrier: "Tallink Megastar", dep: "10:30", arr: "12:30", dur: "2h 00", price: 24, badge: "Cheapest", co2: "12 kg", from: "Länsi T2", to: "D-Terminal" },
  { mode: "ferry", carrier: "Eckerö Finlandia", dep: "11:00", arr: "13:30", dur: "2h 30", price: 29, co2: "14 kg", from: "Länsi T2", to: "A-Terminal" },
  { mode: "ferry", carrier: "Viking XPRS", dep: "12:30", arr: "15:00", dur: "2h 30", price: 32, co2: "14 kg", from: "Katajanokka", to: "A-Terminal" },
  { mode: "plane", carrier: "Finnair AY 1041", dep: "09:55", arr: "10:30", dur: "0h 35 + 2h transfer", price: 142, badge: "Fastest", co2: "48 kg", from: "HEL", to: "TLL" },
  { mode: "ferry", carrier: "Tallink Star", dep: "13:30", arr: "15:30", dur: "2h 00", price: 26, co2: "12 kg", from: "Länsi T2", to: "D-Terminal" },
];

// ─── Route Planner ───
export interface RouteStep {
  mode: "walk" | "tram" | "bus" | "taxi" | "bed";
  time: string;
  title: string;
  sub: string;
  brand?: boolean;
  final?: boolean;
  last?: boolean;
}

export const routeSteps: RouteStep[] = [
  { mode: "walk", time: "12:30", title: "Disembark D-Terminal", sub: "Follow signs to Sadama tn · 6 min" },
  { mode: "tram", time: "12:38", title: "Sadama → Hobujaama", sub: "<b>Tram 2</b> · 4 stops · 12 min · €2.00", brand: true },
  { mode: "walk", time: "12:50", title: "Hobujaama → Telegraaf", sub: "Vene tn · 8 min through Old Town" },
  { mode: "bed", time: "12:56", title: "Telegraaf Hotel · check-in", sub: "Vene 9, Tallinn", final: true, last: true },
];

export interface RouteAlt {
  icons: string[];
  label: string;
  dur: string;
  cost: string;
}

export const routeAlternatives: RouteAlt[] = [
  { icons: ["walk"], label: "Walk only", dur: "22 min", cost: "Free" },
  { icons: ["taxi"], label: "Taxi (Bolt)", dur: "9 min", cost: "€8.50" },
  { icons: ["walk", "bus", "walk"], label: "Bus 2 + walk", dur: "24 min", cost: "€2.00" },
];

// ─── Club Card ───
export interface ClubPerk {
  title: string;
  sub: string;
  accent?: boolean;
}

export const clubPerks: ClubPerk[] = [
  { title: "−15% in Sea Pub", sub: "Today only", accent: true },
  { title: "Free lounge", sub: "Deck 7" },
  { title: "Priority boarding", sub: "At all gates" },
  { title: "2× points", sub: "Until Sunday" },
];

export interface ClubActivity {
  date: string;
  title: string;
  pts: string;
}

export const clubActivities: ClubActivity[] = [
  { date: "Thu", title: "Helsinki → Tallinn", pts: "+120" },
  { date: "Wed", title: "Berlin → Helsinki", pts: "+340" },
  { date: "Mar", title: "Stockholm → Riga", pts: "+180" },
  { date: "Feb", title: "Helsinki → Stockholm", pts: "+260" },
  { date: "Jan", title: "Tallinn → Helsinki", pts: "+120" },
];
