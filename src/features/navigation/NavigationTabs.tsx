import { JSX } from "react";
import { Link } from "wouter";

import TicketsView from "../tickets/TicketsView";
import Agents from "@/pages/Agents";
import { cn } from "@/lib/utils";

type Route = {
  label: string;
  location: string;
  view: () => JSX.Element;
  icon?: () => JSX.Element;
};

const authRoutes: Route[] = [
  {
    label: "Tickets",
    location: "/",
    view: TicketsView,
  },
  {
    label: "Agents",
    location: "/_admin/agents",
    view: Agents,
  },
];

export function NavigationTabs() {
  return (
    <nav className="mb-4">
      <ul className="border-b-muted flex gap-2 border-b-2 py-2">
        {authRoutes.map((route) => (
          <li key={route.location}>
            <Link
              to={route.location}
              className={(active) =>
                cn(
                  "py-2 text-sm",
                  active &&
                    "border-b-primary right-0 bottom-0 left-0 border-b-2 font-semibold",
                )
              }
            >
              <span className="hover:bg-muted rounded px-2 py-1">
                {route.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
