import useAuthStore from "@/features/auth/useAuthStore";
import { PropsWithChildren } from "react";

export default function Sidebar(props: PropsWithChildren) {
  const { children } = props;
  const isAuth = useAuthStore((state) => state.auth);

  if (!isAuth) return null;

  return <aside className="bg-muted w-50 shrink-0 border-r">{children}</aside>;
}
