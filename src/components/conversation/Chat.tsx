import MessageInput from "@/components/conversation/MessageInput";
import { MessageProps } from "@/components/conversation/MessageItem";
import MessageList from "@/components/conversation/MessageList";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type Props = {
  messages: MessageProps[];
  onSubmit: (formData: { message: string }) => void;
  className?: string;
  disabledSend?: boolean;
};

export default function Chat(props: Props) {
  const { messages, onSubmit, disabledSend, className } = props;

  const timerId = useRef<NodeJS.Timeout | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    timerId.current = setTimeout(() => {
      endRef.current?.scrollIntoView();
    }, 100);
  }

  useEffect(() => {
    scrollToBottom();
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);

  const handleSubmit = async (formData: { message: string }) => {
    await onSubmit(formData);
    scrollToBottom();
  };

  return (
    <div className={cn("relative flex flex-col", className)}>
      <MessageList messages={messages} />

      <div className="bg-card/50 sticky bottom-0 rounded-xl py-4 backdrop-blur-md">
        <MessageInput
          className=""
          onSubmit={handleSubmit}
          disabled={disabledSend}
        />
      </div>

      <div ref={endRef} />
    </div>
  );
}
