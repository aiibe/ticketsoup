import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onSubmit: (formData: { message: string }) => void;
  disabled?: boolean;
  className?: string;
};

export default function MessageInput(props: Props) {
  const { onSubmit, disabled, className } = props;

  const [message, setMessage] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      handleSubmit();
    }
  };

  async function handleSubmit() {
    if (message) {
      onSubmit({ message: message.trim() });
      setMessage("");
    }
  }

  return (
    <div className={cn(className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex items-center gap-2"
      >
        <Textarea
          disabled={disabled}
          name="message"
          autoFocus
          className="z-20 min-h-8 resize-none rounded-xl bg-white"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          disabled={!message}
          className="rounded-2xl"
          onClick={handleSubmit}
        >
          <SendHorizonal />
        </Button>
      </form>

      <span className="text-muted-foreground ml-2 text-xs">
        ⌘ + Enter to send
      </span>
    </div>
  );
}
