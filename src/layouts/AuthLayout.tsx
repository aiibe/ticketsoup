import { PropsWithChildren } from "react";
import NavigationTabs from "@/features/navigation/NavigationTabs";

export default function AuthLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <section className="grid w-full grid-cols-12 gap-2">
      <div className="col-span-10 col-start-2 py-4 md:col-span-6 md:col-start-4">
        <NavigationTabs />

        {children}
      </div>
    </section>
  );
}
