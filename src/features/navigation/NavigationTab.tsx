import { Link } from "wouter";
import { Route } from "./navigation.types";
import { useCheckRoles } from "../auth/useCheckRoles";
import { cn } from "@/lib/utils";

type Props = {
  route: Route;
};

export function NavigationTab(props: Props) {
  const { route } = props;

  const isHidden = useCheckRoles(route.hiddenToRoles || []);

  if (isHidden) return null;

  return (
    <li>
      <Link
        to={route.location}
        className={(active) =>
          cn(
            "py-2.5 text-sm",
            active && "border-b-primary border-b-2 font-semibold",
          )
        }
      >
        <span className="hover:bg-muted rounded px-2 py-1">{route.label}</span>
      </Link>
    </li>
  );
}
