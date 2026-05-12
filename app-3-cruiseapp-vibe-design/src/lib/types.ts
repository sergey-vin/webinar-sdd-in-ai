export interface TimelineEvent {
  done?: boolean;
  active?: boolean;
  time: string;
  zone: string;
  mode: "plane" | "ship" | "tram" | "walk" | "bed" | "bus" | "taxi" | "pin";
  title: string;
  detail: string;
  last?: boolean;
}

export interface OnboardActivity {
  icon: string;
  title: string;
  sub: string;
  badge?: string;
  accent?: boolean;
}

export interface ScheduleEvent {
  time: string;
  dur: string;
  title: string;
  loc: string;
  icon: string;
  type: string;
  highlight?: boolean;
  anchor?: boolean;
}

export interface ShipDestination {
  icon: string;
  title: string;
  sub: string;
  eta: string;
}

export interface DeckRoom {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  highlighted?: boolean;
  youAreHere?: boolean;
  small?: boolean;
}

export type TabId = "trip" | "search" | "route" | "club" | "you";
export type TimezoneMode = "ship" | "local" | "home";
