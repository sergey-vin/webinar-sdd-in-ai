import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TerminalInfo } from "@/components/terminal/terminal-info";
import { TransportList } from "@/components/terminal/transport-list";

interface TerminalPageProps {
  params: Promise<{ id: string }>;
}

export default async function TerminalPage({ params }: TerminalPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: terminal } = await supabase
    .from("terminals")
    .select("*")
    .eq("id", id)
    .single();

  if (!terminal) return notFound();

  const { data: transportOptions } = await supabase
    .from("transport_options")
    .select("*")
    .eq("terminal_id", terminal.id)
    .order("sort_order", { ascending: true });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold">Terminal Info</h1>

        <TerminalInfo terminal={terminal} />

        {transportOptions && transportOptions.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Getting There</h2>
            <TransportList transportOptions={transportOptions} />
          </div>
        )}
      </div>
    </div>
  );
}
