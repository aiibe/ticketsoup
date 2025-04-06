import { Redirect, useLocation } from "wouter";
import useAuthStore from "@/features/auth/useAuthStore";
import OtpForm from "@/features/otp/OtpForm";

export default function AgentLoginPage() {
  const [, navigate] = useLocation();

  const auth = useAuthStore((state) => state.auth);
  if (auth?.isValid) return <Redirect to="/" />;

  return (
    <div className="flex w-full items-center justify-center">
      <OtpForm type="agent" onSuccess={() => navigate("/")} />
    </div>
  );
}
