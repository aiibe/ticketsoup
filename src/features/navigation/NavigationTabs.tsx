import { authRoutes } from "./authRoutes";
import { NavigationTab } from "./NavigationTab";

export default function NavigationTabs() {
  return (
    <nav className="mb-4">
      <ul className="border-b-muted flex gap-2 border-b-2 py-2">
        {authRoutes.map((route) => (
          <NavigationTab key={route.location} route={route} />
        ))}
      </ul>
    </nav>
  );
}
