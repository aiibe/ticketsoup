import { Route } from "./navigation.types";
import { Roles } from "../auth/useCheckRoles";

export const authRoutes: Route[] = [
  {
    label: "Tickets",
    location: "/",
  },
  {
    label: "Agents",
    location: "/_admin/agents",
    hiddenToRoles: [Roles.Customers, Roles.Agents],
  },
  {
    label: "Feedback Form",
    location: "/_admin/feedback",
    hiddenToRoles: [Roles.Customers, Roles.Agents],
  },
];
