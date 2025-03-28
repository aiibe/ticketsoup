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
            <Link to="/feedback">Feedback</Link>
          </li>

          <li>
            <Link to="/_admin/agents">Agents</Link>
          </li>
        </>
      )}
    </ul>
  );
}
