import TicketLink from "./TicketLink";
import { Link } from "wouter";
import useAuthStore from "../auth/useAuthStore";

export default function SidebarList() {
  const auth = useAuthStore((state) => state.auth);
  const isSuperUser = auth?.isSuperuser && auth?.isValid;

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
