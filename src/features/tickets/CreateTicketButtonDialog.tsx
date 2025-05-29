import { createFeedback } from "@/api/tickets";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { pb } from "@/lib/db/pocketbase";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateTicketButtonDialog() {
  const customerFullName = pb.authStore?.record?.fullName;
  const customerEmail = pb.authStore?.record?.email;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message?: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = event.target as HTMLFormElement;
    const message = form.message.value;

    if (!message) {
      setLoading(false);
      return setError({ message: "Please enter a message" });
    } else {
      const { error, data } = await createFeedback({
        fullName: customerFullName,
        email: customerEmail,
        message,
      });
      if (error) console.log(error);
      if (data) {
        toast.success("Ticket submitted successfully");
      }
    }
    setLoading(false);
    setOpen(false);
  }

  if (!customerFullName || !customerEmail) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Create Ticket</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>How can we help you?</DialogTitle>

          <DialogDescription>
            Submit a ticket and we will get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message"
                className="min-h-[120px]"
              />
              {error?.message && (
                <p className="text-destructive text-xs italic">
                  {error.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
