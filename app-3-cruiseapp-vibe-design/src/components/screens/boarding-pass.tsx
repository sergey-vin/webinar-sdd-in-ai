"use client";

import { useState } from "react";
import { Share2, Anchor, Ship, Plus, Check, RotateCw } from "lucide-react";
import { TopBar, IconButton } from "@/components/shell/top-bar";

export function BoardingPass() {
  const [flipped, setFlipped] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);
  const [brightness, setBrightness] = useState(false);

  const handleWallet = () => {
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 3000);
  };

  return (
    <>
      <TopBar title="Boarding pass" subtitle="Ticket · MS Megastar" right={
        <IconButton label="Share"><Share2 size={18} /></IconButton>
      } />

      <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar">
        {/* Ticket card — flippable */}
        <div
          className="relative cursor-pointer"
          style={{ perspective: "1000px" }}
          onClick={() => setFlipped(!flipped)}
        >
          <div
            className="transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
            }}
          >
            {/* Front */}
            <div style={{ backfaceVisibility: "hidden" }}>
              <div className={`bg-surface rounded-xl border border-hairline overflow-hidden shadow-md transition-all duration-300 ${brightness ? "brightness-110" : ""}`}>
                {/* Header strip */}
                <div className="bg-brand text-white px-[18px] py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Anchor size={18} />
                    <span className="font-semibold text-sm">Tallink Megastar</span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 bg-white/[0.18] rounded-full animate-pulse">BOARDING OPEN</span>
                </div>

                {/* Route */}
                <div className="px-[18px] pt-5 pb-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[32px] font-medium tracking-tight text-ink">HEL</div>
                    <div className="text-xs text-ink-3 mt-0.5">Länsisatama T2</div>
                    <div className="text-[13px] font-semibold mt-1.5">10:30</div>
                  </div>
                  <div className="flex-1 relative mx-2 flex items-center justify-center">
                    <div className="flex-1 h-0 border-t-[1.5px] border-dashed border-ink-5" />
                    <div className="mx-2 text-brand"><Ship size={18} /></div>
                    <div className="flex-1 h-0 border-t-[1.5px] border-dashed border-ink-5" />
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[32px] font-medium tracking-tight text-ink">TLL</div>
                    <div className="text-xs text-ink-3 mt-0.5">D-Terminal</div>
                    <div className="text-[13px] font-semibold mt-1.5">12:30</div>
                  </div>
                </div>

                {/* Perforation */}
                <div className="relative h-6 border-t border-b border-dashed border-hairline-strong bg-surface-2">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-bg rounded-full" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-bg rounded-full" />
                </div>

                {/* Passenger info */}
                <div className="px-[18px] py-3.5 grid grid-cols-2 gap-y-3 gap-x-2">
                  <Field label="Passenger" value="Anna Lindqvist" />
                  <Field label="Class" value="Comfort lounge" />
                  <Field label="Booking ref" value="X9KP2A" mono />
                  <Field label="Seat" value="Open seating" />
                  <Field label="Vehicle" value="—" />
                  <Field label="Boarding gate" value="Gate 4" />
                </div>

                {/* QR Code — tap to brighten */}
                <div
                  className="px-[18px] pt-1 pb-5 flex flex-col items-center"
                  onClick={(e) => { e.stopPropagation(); setBrightness(!brightness); }}
                >
                  <QRPlaceholder bright={brightness} />
                  <div className="font-mono text-xs text-ink-3 mt-2.5 tracking-[0.1em]">X9KP2A · 4421 8870 1102</div>
                  <div className="text-[10px] text-ink-4 mt-1">Tap QR to {brightness ? "dim" : "brighten"} · Tap card to flip</div>
                </div>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="bg-surface rounded-xl border border-hairline overflow-hidden shadow-md h-full">
                <div className="bg-brand text-white px-[18px] py-3.5 flex items-center justify-between">
                  <span className="font-semibold text-sm">Ticket details</span>
                  <RotateCw size={16} className="opacity-60" />
                </div>
                <div className="p-5 space-y-4">
                  <BackField label="Operator" value="AS Tallink Grupp" />
                  <BackField label="Vessel" value="MS Megastar (IMO 9798837)" />
                  <BackField label="Route" value="Helsinki Länsisatama T2 → Tallinn D-Terminal" />
                  <BackField label="Duration" value="2h 00min" />
                  <BackField label="Class" value="Comfort Lounge — Deck 7 access, free coffee & snacks" />
                  <BackField label="Booking" value="Made via CUThere · 12 Mar 2026" />
                  <BackField label="Cancellation" value="Free up to 24h before departure" />
                  <div className="pt-2 text-[10px] text-ink-4 text-center">Tap card to flip back</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to use */}
        <div className="flex items-baseline justify-between px-1 pb-2.5 mt-[18px]">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">How to use this ticket</h2>
        </div>
        <div className="bg-surface border border-hairline rounded-lg overflow-hidden">
          <Step n={1} title="Show the QR at Gate 4" sub="Boarding starts 30 min before departure. The terminal scanners read this directly." />
          <div className="h-px bg-hairline" />
          <Step n={2} title="Walk on — no check-in needed" sub="You have no vehicle and no cabin, so no luggage drop." />
          <div className="h-px bg-hairline" />
          <Step n={3} title="Lounge access on Deck 7" sub="Tap the same QR at the lounge entrance for free coffee & wifi." />
        </div>

        {/* Add to wallet */}
        <button
          onClick={handleWallet}
          className={`w-full mt-3.5 inline-flex items-center justify-center gap-2 px-[18px] py-3.5 rounded-full text-[15px] font-semibold border transition-all duration-300 ${
            walletAdded
              ? "bg-good text-white border-good"
              : "bg-surface text-ink border-hairline hover:border-ink-5 active:scale-[0.98]"
          }`}
        >
          {walletAdded ? (
            <><Check size={16} /> Added to Wallet</>
          ) : (
            <><Plus size={16} /> Add to Apple Wallet</>
          )}
        </button>
      </div>
    </>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[11px] text-ink-4 uppercase tracking-[0.06em] font-semibold">{label}</div>
      <div className={`text-sm font-semibold mt-0.5 ${mono ? "font-mono" : ""}`}>{value}</div>
    </div>
  );
}

function BackField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] text-ink-4 uppercase tracking-[0.06em] font-semibold">{label}</div>
      <div className="text-[13px] text-ink-2 mt-0.5">{value}</div>
    </div>
  );
}

function QRPlaceholder({ bright }: { bright?: boolean }) {
  const N = 21;
  const seed = "cuthere-x9kp2a";
  const cells: boolean[] = [];
  for (let i = 0; i < N * N; i++) {
    const r = Math.floor(i / N), c = i % N;
    const inFinder = (rr: number, cc: number) =>
      (rr < 7 && cc < 7) || (rr < 7 && cc >= N - 7) || (rr >= N - 7 && cc < 7);
    let on: boolean;
    if (inFinder(r, c)) {
      const fr = r >= N - 7 ? r - (N - 7) : r;
      const fc = c >= N - 7 ? c - (N - 7) : c;
      on = fr === 0 || fr === 6 || fc === 0 || fc === 6 || (fr >= 2 && fr <= 4 && fc >= 2 && fc <= 4);
    } else {
      const h = (seed.charCodeAt((r * N + c) % seed.length) + r * 31 + c * 17) % 100;
      on = h > 52;
    }
    cells.push(on);
  }
  return (
    <div className={`w-[168px] h-[168px] p-2 rounded-xl border transition-all duration-300 ${bright ? "bg-white border-accent shadow-lg scale-105" : "bg-white border-hairline"}`}>
      <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}>
        {cells.map((on, i) => (
          <div key={i} className={`rounded-[1px] ${on ? "bg-ink" : ""}`} />
        ))}
      </div>
    </div>
  );
}

function Step({ n, title, sub }: { n: number; title: string; sub: string }) {
  return (
    <div className="px-4 py-3.5 flex gap-3 items-start">
      <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-semibold shrink-0">
        {n}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-ink-3 mt-0.5">{sub}</div>
      </div>
    </div>
  );
}
