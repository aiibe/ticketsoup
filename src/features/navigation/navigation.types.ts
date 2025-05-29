import { JSX } from "react";
import { Roles } from "../auth/useCheckRoles";

export type Route = {
  label: string;
  location: string;
  view: () => JSX.Element;
  icon?: () => JSX.Element;
  hiddenToRoles?: Roles[];
};
