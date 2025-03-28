import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import useAuth from "@/hooks/useAuth";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Header />

      <main className="flex flex-1">
        {isLoggedIn && <Sidebar />}

        {children}
      </main>

      <Footer />
    </>
  );
}
