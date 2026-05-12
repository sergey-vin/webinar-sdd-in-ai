const personas = {
  solo: { bg: "#0B3D5C", fg: "#FCE5DC", initial: "A" },
  family: { bg: "#E8623A", fg: "#FFF", initial: "L" },
  business: { bg: "#2C3A4E", fg: "#F4F1EB", initial: "M" },
  cruise: { bg: "#1B5A82", fg: "#FFF", initial: "R" },
} as const;

export function Avatar({
  persona = "solo",
  size = 36,
}: {
  persona?: keyof typeof personas;
  size?: number;
}) {
  const c = personas[persona];
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold shrink-0"
      style={{
        width: size,
        height: size,
        background: c.bg,
        color: c.fg,
        fontSize: size * 0.42,
      }}
    >
      {c.initial}
    </div>
  );
}
