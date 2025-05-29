import { Trash2 } from "lucide-react";
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
import { removeAgent } from "@/api/agents";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  agentId: string;
  className?: string;
};

export default function DeleteAgentButtonDialog(props: Props) {
  const { agentId, className } = props;

  const [open, setOpen] = useState(false);

  async function handleConfirm() {
    const { data, error } = await removeAgent(agentId);
    if (error) console.log(error);
    if (data) {
      toast.success("Agent deleted successfully");
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Trash2
          onClick={() => setOpen(true)}
          size={16}
          className={cn("hover:stroke-destructive cursor-pointer", className)}
        />
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this agent?</DialogTitle>

          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            agent.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={handleConfirm}>Delete permanently</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
