import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { closeTicket } from "@/api/tickets";
import { toast } from "sonner";
import { useLocation } from "wouter";

type Props = {
  ticketId: string;
  children: React.ReactNode;
};

export default function CloseTicketDialog({ ticketId, children }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  async function handleClose() {
    setLoading(true);
    try {
      const { error, data } = await closeTicket(ticketId);

      if (error) {
        toast.error("Failed to close ticket");
        console.error(error);
      } else if (data) {
        toast.success("Ticket closed successfully");
        setOpen(false);
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to close ticket");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Close Ticket</DialogTitle>
          <DialogDescription>
            Are you sure you want to close this ticket? This action will mark
            the ticket as resolved.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleClose} disabled={loading}>
            {loading ? "Closing..." : "Close Ticket"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
