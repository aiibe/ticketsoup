import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import DateAutoRefresh from "../DateAutoRefresh";

export type MessageProps = {
  message: string;
  sender: string;
  created?: string;
  align: "start" | "end";
};

export default function MessageItem(props: MessageProps) {
  const { message, sender, created, align } = props;

  const isAlignStart = align === "start";
  const alignItems = isAlignStart ? "items-start" : "items-end";
  const rowReverse = isAlignStart ? "" : "flex-row-reverse";
  const background = isAlignStart
    ? "bg-muted"
    : "bg-primary text-primary-foreground border-primary";
  const corner = isAlignStart ? "rounded-bl-none " : "rounded-br-none";

  return (
    <div className={cn("flex flex-col gap-1", alignItems)}>
      <Card
        className={cn(
          "min-w-[180px] rounded-t-xl px-3 py-1 whitespace-pre-wrap",
          background,
          corner,
        )}
      >
        {message}
      </Card>

      <p className={cn("text-muted-foreground flex gap-2 text-xs", rowReverse)}>
        <span className="font-semibold">{sender}</span>
        <span>·</span>
        <DateAutoRefresh timestamp={created} refreshInterval={1000 * 60} />
      </p>
    </div>
  );
}
