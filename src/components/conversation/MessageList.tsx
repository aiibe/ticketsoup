import { useEffect, useRef, useState } from "react";
import MessageItem, { MessageProps } from "./MessageItem";
import { cn } from "@/lib/utils";

type Props = {
  messages: MessageProps[];
};

export default function MessageList(props: Props) {
  const { messages } = props;
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView();

    let timer: NodeJS.Timeout | null = null;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [messages]);

  return (
    <div className="relative flex w-full flex-col gap-4">
      {messages.map((message, index) => (
        <MessageItem key={index} {...message} />
      ))}

      <div
        className={cn(
          "bg-card absolute top-0 h-full w-full",
          !loading && "hidden",
        )}
      />
      <div ref={chatContainerRef} />
    </div>
  );
}
