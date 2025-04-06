import { Redirect, useLocation } from "wouter";
import OtpForm from "@/features/otp/OtpForm";
import useAuthStore from "@/features/auth/useAuthStore";

export default function AgentLoginPage() {
  const [, navigate] = useLocation();

  const isAuth = useAuthStore((state) => state.auth);
  if (isAuth) return <Redirect to="/" />;

  return (
    <div className="flex w-full items-center justify-center">
      <OtpForm type="agent" onSuccess={() => navigate("/")} />
    </div>
  );
}
