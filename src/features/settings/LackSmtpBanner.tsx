import Banner from "@/components/Banner";
import { useEffect, useState } from "react";
import { AppSettings } from "./settings.types";
import { pb } from "@/lib/db/pocketbase";
import { baseUrl } from "@/config";
import ExternalLink from "@/components/ExternalLink";
import { Roles, useCheckRoles } from "../auth/useCheckRoles";
import useAuthStore from "../auth/useAuthStore";

export default function LackSmtpBanner() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const isAdmin = useCheckRoles([Roles.Admins]);

  const [ok, setOk] = useState(true);

  useEffect(() => {
    async function checkSettings() {
      try {
        const settings = await pb.settings.getAll();
        const { smtp } = settings as AppSettings;
        setOk(smtp.enabled);
      } catch (error) {
        console.log(error);
        setAuth(false);
      }
    }

    if (isAdmin) {
      checkSettings();
    }
  }, [isAdmin, setAuth]);

  if (ok || !isAdmin) return null;

  return (
    <section className="grid w-full grid-cols-12">
      <div className="col-span-10 col-start-2 mt-2 md:col-span-6 md:col-start-4">
        <Banner
          severity="warning"
          title="SMTP is not configured"
          description={
            <>
              <span>
                SMTP mail server has not been set or enabled in your settings.
                Your team will not be able to send nor receive emails related to
                any activities.
              </span>

              <ExternalLink href={`${baseUrl}_/#/settings/mail`}>
                Configure SMTP
              </ExternalLink>
            </>
          }
        />
      </div>
    </section>
  );
}
