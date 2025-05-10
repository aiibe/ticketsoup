import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  title?: string | ReactNode;
  description?: string | ReactNode;
  className?: string;
  severity?: "info" | "warning" | "error";
};

export default function Banner(props: Props) {
  const { className, title, description } = props;

  // TODO : add severity

  return (
    <div
      className={cn(
        "bg-warning flex flex-col items-start gap-2 rounded-lg px-4 py-3 text-sm",
        className,
      )}
    >
      {title ? (
        typeof title === "string" ? (
          <span className="font-semibold">{title}</span>
        ) : (
          title
        )
      ) : null}

      {description ? (
        typeof description === "string" ? (
          <span>{description}</span>
        ) : (
          description
        )
      ) : null}
    </div>
  );
}
