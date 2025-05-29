import AgentResetPasswordForm from "@/features/agents/AgentResetPasswordForm";
import useAuthStore from "@/features/auth/useAuthStore";
import { Redirect, useParams } from "wouter";

export default function ConfirmAgentPage() {
  const { token } = useParams<{ token: string }>();
  const isAuth = useAuthStore((state) => state.auth);

  // Allow public access only
  if (isAuth || token?.length < 100) return <Redirect to="/" />;

  return (
    <section className="grid w-full grid-cols-12 gap-2">
      <div className="col-span-10 col-start-2 py-4 md:col-span-6 md:col-start-4">
        <div className="mt-10 flex w-full items-center justify-center">
          <AgentResetPasswordForm token={token} />
        </div>
      </div>
    </section>
  );
}
