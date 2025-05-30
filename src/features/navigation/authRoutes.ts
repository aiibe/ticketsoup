import AgentsPage from "@/pages/AgentsPage";
import TicketsView from "../tickets/TicketsView";
import { Route } from "./navigation.types";
import { Roles } from "../auth/useCheckRoles";

export const authRoutes: Route[] = [
  {
    label: "Tickets",
    location: "/",
    view: TicketsView,
  },
  {
    label: "Agents",
    location: "/_admin/agents",
    view: AgentsPage,
    hiddenToRoles: [Roles.Customers, Roles.Agents],
  },
  {
    label: "Feedback Form",
    location: "/_admin/feedback",
    view: AgentsPage,
    hiddenToRoles: [Roles.Customers, Roles.Agents],
  },
];
