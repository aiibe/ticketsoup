import { PropsWithChildren, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import useAuthStore from "@/features/auth/useAuthStore";

type Props = {
  List: ReactNode;
};

export default function Layout(props: PropsWithChildren<Props>) {
  const { children, List } = props;

  // TODO Remove from here
  const auth = useAuthStore((state) => state.auth);
  const isLoggedIn = auth?.isValid;

  return (
    <>
      <Header />

      <main className="flex flex-1">
        {isLoggedIn && <Sidebar>{List}</Sidebar>}

        {children}
      </main>

      <Footer />
    </>
  );
}
