import { pb } from "@/lib/db/pocketbase";
import { PropsWithChildren } from "react";
import { useLocation } from "wouter";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}

function Header() {
  const [, navigate] = useLocation();
  const isLoggedIn = pb.authStore.isValid;

  function logOut() {
    pb.authStore.clear();
    navigate("/login");
  }

  return (
    <header>
      <nav>
        <ul className="flex gap-4">
          {isLoggedIn && <li onClick={logOut}>Sign out</li>}
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return <footer>Footer</footer>;
}
