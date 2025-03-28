import MessageInput from "@/components/conversation/MessageInput";
import { MessageProps } from "@/components/conversation/MessageItem";
import MessageList from "@/components/conversation/MessageList";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type Props = {
  messages: MessageProps[];
  onSubmit: (formData: { message: string }) => void;
  className?: string;
  disabledSend?: boolean;
};

export default function Chat(props: Props) {
  const { messages, onSubmit, disabledSend, className } = props;

  const endContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // Scroll to bottom
  useEffect(() => {
    endContainerRef.current?.scrollIntoView();
    let timer: NodeJS.Timeout | null = null;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <div className={cn("relative flex flex-col", className)}>
      <div className="px-2">
        <MessageList messages={messages} />
      </div>

      <div className="bg-card/50 sticky bottom-0 rounded-xl px-16 py-4 backdrop-blur-md">
        <MessageInput onSubmit={onSubmit} disabled={disabledSend} />
      </div>

      <div ref={endContainerRef} />
      <div
        className={cn(
          "bg-card absolute top-0 h-full w-full",
          !loading && "hidden",
        )}
      />
    </div>
  );
}
