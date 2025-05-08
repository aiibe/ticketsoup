import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/features/auth/useAuthStore";
import { pb } from "@/lib/db/pocketbase";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [, navigate] = useLocation();
  const clearAuth = useAuthStore((state) => state.clear);
  const isAuth = useAuthStore((state) => state.auth);
  const isSuperUser = pb.authStore?.isSuperuser;

  function logOut() {
    clearAuth();
    navigate("/login");
  }

  return (
    <header className="grid h-[48px] grid-cols-12 items-center justify-between p-2">
      <div className="col-span-12 grid grid-cols-2 md:col-span-6 md:col-start-4">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src="/ticketsoup.svg" alt="TicketSoup" className="h-8 w-8" />
          </Link>

          {isAuth && (
            <Badge variant="outline">
              {pb.authStore?.record?.collectionName}
            </Badge>
          )}
        </div>

        <nav className="flex items-center justify-end gap-4">
          <ul className="flex gap-4">
            {isAuth && (
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
                      src={`https://api.dicebear.com/9.x/identicon/svg?seed=${(isSuperUser ? pb.authStore.record?.id || "" : pb.authStore.record?.fullName || "").slice(0, 4)}`}
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
      </div>
    </header>
  );
}
