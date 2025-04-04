import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"section"> & {
  className?: string;
};

export default function Section(props: Props) {
  const { className, ...rest } = props;
  return (
    <section
      className={cn(
        "h-[calc(100vh-48px-36px)] w-full overflow-y-scroll",
        className,
      )}
      {...rest}
    />
  );
}
