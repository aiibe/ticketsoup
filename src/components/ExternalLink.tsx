import { cn } from "@/lib/utils";

export default function ExternalLink(props: React.ComponentProps<"a">) {
  const { className, ...rest } = props;
  return (
    <a
      className={cn("text-primary underline", className)}
      {...rest}
      target="_blank"
    />
  );
}
