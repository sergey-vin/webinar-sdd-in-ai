"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  transferOptions,
  parkingOptions,
  departureChecklist,
} from "@/lib/mock-data";

const TYPE_ICONS: Record<string, string> = {
  car: "🚗",
  taxi: "🚕",
  shuttle: "🚐",
  public: "🚇",
};

export default function TransferPage() {
  const [selectedTransfer, setSelectedTransfer] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleChecked = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const checklistCategories = [
    ...new Set(departureChecklist.map((c) => c.category)),
  ];

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-1">Transfer Planning</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Getting to Barcelona Cruise Terminal
      </p>

      {/* Transfer options */}
      <h2 className="font-semibold mb-3">How are you getting there?</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {transferOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() =>
              setSelectedTransfer(
                selectedTransfer === opt.id ? null : opt.id
              )
            }
            className={`text-left p-3 rounded-lg border transition-colors ${
              selectedTransfer === opt.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="text-2xl mb-1">{TYPE_ICONS[opt.type]}</div>
            <p className="font-medium text-sm">{opt.name}</p>
            <p className="text-xs text-muted-foreground">{opt.priceRange}</p>
          </button>
        ))}
      </div>

      {/* Selected transfer details */}
      {selectedTransfer && (
        <Card className="mb-6">
          <CardContent className="p-4">
            {(() => {
              const opt = transferOptions.find(
                (t) => t.id === selectedTransfer
              )!;
              return (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{TYPE_ICONS[opt.type]}</span>
                    <h3 className="font-semibold">{opt.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {opt.description}
                  </p>

                  <h4 className="text-sm font-medium mb-2">Details</h4>
                  <ul className="text-sm space-y-1 mb-4">
                    {opt.details.map((d, i) => (
                      <li key={i} className="text-muted-foreground">
                        • {d}
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-sm font-medium mb-2">Tips</h4>
                  <ul className="text-sm space-y-1">
                    {opt.tips.map((t, i) => (
                      <li key={i} className="text-muted-foreground">
                        💡 {t}
                      </li>
                    ))}
                  </ul>
                </>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Parking section (show when car is selected) */}
      {selectedTransfer === "own-car" && (
        <>
          <h2 className="font-semibold mb-3">Parking Options</h2>
          <div className="space-y-3 mb-6">
            {parkingOptions.map((p) => (
              <Card key={p.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-sm">{p.name}</h3>
                    <Badge variant="secondary">
                      €{p.pricePerDay}/day
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {p.address}
                  </p>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="outline">{p.distanceToTerminal}</Badge>
                    {p.shuttle && (
                      <Badge variant="outline">Free shuttle</Badge>
                    )}
                    {p.covered && <Badge variant="outline">Covered</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <Separator className="my-4" />

      {/* Departure checklist */}
      <h2 className="font-semibold mb-1">Departure Checklist</h2>
      <p className="text-xs text-muted-foreground mb-3">
        {checkedItems.size} of {departureChecklist.length} packed
      </p>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full mb-4">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{
            width: `${(checkedItems.size / departureChecklist.length) * 100}%`,
          }}
        />
      </div>

      {checklistCategories.map((cat) => (
        <div key={cat} className="mb-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            {cat}
          </h3>
          <div className="space-y-1">
            {departureChecklist
              .filter((c) => c.category === cat)
              .map((item) => {
                const checked = checkedItems.has(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleChecked(item.id)}
                    className="w-full text-left flex items-center gap-3 py-2 px-3 rounded hover:bg-muted transition-colors"
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        checked
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {checked && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        checked
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {item.text}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
