import { cn } from "@/lib/utils";

export default function Section(props: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("h-[calc(100vh-48px-36px)] w-full overflow-y-scroll p-4")}
      {...props}
    />
  );
}
