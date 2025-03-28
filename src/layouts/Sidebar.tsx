import useAuth from "@/hooks/useAuth";
import { Link } from "wouter";

export default function Sidebar() {
  const { isSuperUser } = useAuth();

  return (
    <aside className="w-64 border-r border-r-gray-300">
      <ul className="p-2">
        <li>
          <Link to="/">Tickets</Link>
        </li>

        <li>
          <Link to="/ticket/234">Ticket #234</Link>
        </li>

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
    </aside>
  );
}
