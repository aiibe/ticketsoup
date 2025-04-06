import { PropsWithChildren, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

type Props = {
  List: ReactNode;
};

export default function Layout(props: PropsWithChildren<Props>) {
  const { children, List } = props;

  return (
    <>
      <Header />

      <main className="flex flex-1">
        <Sidebar>{List}</Sidebar>

        {children}
      </main>

      <Footer />
    </>
  );
}
