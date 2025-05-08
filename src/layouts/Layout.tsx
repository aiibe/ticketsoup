import { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Header />
      <main className="flex flex-1">{children}</main>
    </>
  );
}
