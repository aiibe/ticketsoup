import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import Header from "./Header";
import LackSmtpBanner from "@/features/settings/LackSmtpBanner";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Header />
      <LackSmtpBanner />
      <main className="flex flex-1">{children}</main>
      <Toaster />
    </>
  );
}
