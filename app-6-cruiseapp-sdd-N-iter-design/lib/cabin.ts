/**
 * Parse cabin/seat info from trip_legs.seat_info to determine deck and position.
 * Examples: "Cabin 6021" → deck 6, cabin 021 → port side
 *           "Seat 14A" → null (not a cabin)
 */
export function parseCabinInfo(seatInfo: string | null | undefined): {
  deckNumber: number;
  cabinNumber: string;
  x: number;
  y: number;
} | null {
  if (!seatInfo) return null;
  const match = seatInfo.match(/Cabin\s+(\d)(\d{2,3})/i);
  if (!match) return null;

  const deckNumber = parseInt(match[1], 10);
  const cabinNum = parseInt(match[2], 10);

  // Heuristic: even cabins = port (left), odd = starboard (right)
  // Position along the ship based on cabin number magnitude
  const isPort = cabinNum % 2 === 0;
  const x = isPort ? 130 : 370;
  // Spread cabins along the ship length (60-220 y range)
  const yOffset = Math.min(cabinNum, 99);
  const y = 80 + (yOffset / 99) * 120;

  return { deckNumber, cabinNumber: match[1] + match[2], x, y };
}
