import { pb } from "@/lib/db/pocketbase";
import useAuthStore from "../auth/useAuthStore";
import TicketLink from "./TicketLink";
import { Link } from "wouter";

export default function SidebarList() {
  const isAuth = useAuthStore((state) => state.auth);
  const isSuperUser = pb.authStore?.isSuperuser && isAuth;

  return (
    <ul className="p-2">
      <TicketLink />

      {isSuperUser && (
        <>
          <li>
            <Link
              className="hover:bg-accent flex justify-between rounded-lg px-2 py-1"
              to="/feedback"
            >
              Feedback
            </Link>
          </li>

          <li>
            <Link
              className="hover:bg-accent flex justify-between rounded-lg px-2 py-1"
              to="/_admin/agents"
            >
              Agents
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
