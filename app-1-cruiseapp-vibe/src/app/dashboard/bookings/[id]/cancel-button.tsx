"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [cancelling, setCancelling] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleCancel() {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }

    setCancelling(true);
    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", bookingId);

    if (error) {
      alert("Failed to cancel booking. Please try again.");
      setCancelling(false);
      setConfirmed(false);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="destructive"
        onClick={handleCancel}
        disabled={cancelling}
      >
        {cancelling ? (
          <>
            <Loader2 className="size-4 mr-1 animate-spin" />
            Cancelling...
          </>
        ) : confirmed ? (
          "Confirm Cancellation"
        ) : (
          "Cancel Booking"
        )}
      </Button>
      {confirmed && !cancelling && (
        <Button variant="outline" onClick={() => setConfirmed(false)}>
          Never mind
        </Button>
      )}
    </div>
  );
}
