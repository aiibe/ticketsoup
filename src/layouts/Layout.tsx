import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import Header from "./Header";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Header />
      <main className="flex flex-1">{children}</main>
      <Toaster />
    </>
  );
}
