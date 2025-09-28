import { JSX } from "react";
import { Roles } from "../auth/useCheckRoles";

export type Route = {
  label: string;
  location: string;
  icon?: () => JSX.Element;
  hiddenToRoles?: Roles[];
};
