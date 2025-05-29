import { createAgent } from "@/api/agents";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateUpdateAgentButtonDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ name?: string; email?: string } | null>(
    null,
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;

    if (!email) return setError({ email: "Enter a valid email" });
    if (!name) return setError({ name: "Enter a name" });

    const { error, data } = await createAgent({
      fullName: name.trim(),
      email: email,
    });
    if (error) console.log(error);
    if (data) {
      toast.success("Agent created successfully");
    }

    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add an agent</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a new agent</DialogTitle>

          <DialogDescription>
            Fill out the form below to add a new agent
          </DialogDescription>
        </DialogHeader>

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Full Name" />
              {error?.name && (
                <p className="text-destructive text-xs italic">{error.name}</p>
              )}

              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="Email" type="email" />
              {error?.email && (
                <p className="text-destructive text-xs italic">{error.email}</p>
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
