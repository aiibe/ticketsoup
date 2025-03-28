import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { pb } from "@/lib/db/pocketbase";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [, navigate] = useLocation();
  const { isLoggedIn } = useAuth();

  function logOut() {
    pb.authStore.clear();
    navigate("/login");
  }

  return (
    <header className="flex h-[48px] items-center justify-between border-b border-b-gray-300 p-2">
      <Link to="/">
        <img src="/ticketsoup.svg" alt="TicketSoup" />
      </Link>

      <nav className="flex items-center gap-4">
        <ul className="flex gap-4">
          {isLoggedIn && (
            <>
              {/* Logout */}
              <li>
                <Button size="sm" variant="secondary" onClick={logOut}>
                  Logout
                </Button>
              </li>

              {/* Avatar */}
              <li>
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${pb.authStore.record?.email.slice(0, 4)}`}
                  />
                  <AvatarFallback>
                    {pb.authStore.record?.email.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
