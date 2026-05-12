import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { DeckSelector } from "@/components/ship/deck-selector";
import { DeckMap } from "@/components/ship/deck-map";
import { WayfindingPanel } from "@/components/ship/wayfinding-panel";

interface DeckPageProps {
  params: Promise<{ shipSlug: string; deckNumber: string }>;
}

export default async function DeckPage({ params }: DeckPageProps) {
  const { shipSlug, deckNumber } = await params;
  const deckNum = parseInt(deckNumber, 10);
  const supabase = await createClient();

  // Fetch ship by slug
  const { data: ship } = await supabase
    .from("ships")
    .select("*")
    .eq("slug", shipSlug)
    .single();

  if (!ship) return notFound();

  // Fetch all decks for this ship
  const { data: decks } = await supabase
    .from("decks")
    .select("*")
    .eq("ship_id", ship.id)
    .order("deck_number", { ascending: true });

  if (!decks || decks.length === 0) return notFound();

  // Find current deck
  const currentDeck = decks.find((d) => d.deck_number === deckNum);
  if (!currentDeck) return notFound();

  // Fetch amenities for this deck
  const { data: amenities } = await supabase
    .from("amenities")
    .select("*")
    .eq("deck_id", currentDeck.id);

  // Fetch all amenities across all decks for wayfinding
  const deckIds = decks.map((d) => d.id);
  const { data: allAmenities } = await supabase
    .from("amenities")
    .select("*")
    .in("deck_id", deckIds);

  // Enrich amenities with deck info for wayfinding
  const enrichedAmenities = (allAmenities || []).map((a) => {
    const deck = decks.find((d) => d.id === a.deck_id);
    return {
      ...a,
      deck_number: deck?.deck_number,
      deck_name: deck?.name,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{ship.name}</h1>
          <p className="text-muted-foreground">
            Deck {currentDeck.deck_number} - {currentDeck.name}
          </p>
        </div>

        <DeckSelector
          shipSlug={shipSlug}
          decks={decks.map((d) => ({
            deck_number: d.deck_number,
            name: d.name,
          }))}
          currentDeck={deckNum}
        />

        {currentDeck.description && (
          <p className="text-sm text-muted-foreground">{currentDeck.description}</p>
        )}

        {amenities && amenities.length > 0 ? (
          <DeckMap amenities={amenities} deckName={`Deck ${currentDeck.deck_number} - ${currentDeck.name}`} />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No amenities listed for this deck.</p>
          </div>
        )}

        {enrichedAmenities.length > 1 && (
          <WayfindingPanel amenities={enrichedAmenities} />
        )}
      </div>
    </div>
  );
}
