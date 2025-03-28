import { PropsWithChildren } from "react";

export default function Sidebar(props: PropsWithChildren) {
  const { children } = props;
  return <aside className="bg-muted w-50 shrink-0 border-r">{children}</aside>;
}
