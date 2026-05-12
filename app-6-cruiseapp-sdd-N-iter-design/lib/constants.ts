/** Demo user credentials for quick switching */
export const DEMO_USERS = {
  elena: {
    email: "elena@cuthere.demo",
    password: "demo123456",
    name: "Elena Volkova",
    nameRu: "Елена Волкова",
  },
  james: {
    email: "james@cuthere.demo",
    password: "demo123456",
    name: "James Chen",
    nameRu: "Джеймс Чен",
  },
} as const;

/** Design token constants (mirrors CSS variables for TS use) */
export const COLORS = {
  bg: "#F4F1EB",
  ink: "#0E1A2B",
  brand: "#0B3D5C",
  brandLight: "#1B5A82",
  brandSoft: "#DCE7EE",
  accent: "#E8623A",
  accentSoft: "#FCE5DC",
  surface: "#FFFFFF",
  good: "#2F7A5B",
  warn: "#C68B12",
  bad: "#B43A3A",
} as const;

/** Club tier colors */
export const TIER_COLORS: Record<string, string> = {
  blue: "#3B82F6",
  silver: "#9CA3AF",
  gold: "#D4A574",
  platinum: "#1a1a2e",
};

/** Transport mode icons (Lucide icon names) */
export const MODE_ICONS: Record<string, string> = {
  ferry: "ship",
  flight: "plane",
  bus: "bus",
  train: "train-front",
  metro: "train-front",
  walk: "footprints",
  taxi: "car",
  tram: "tram-front",
};
