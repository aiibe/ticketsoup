import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPassordForm from "@/features/auth/ResetPassordForm";
import { pb } from "@/lib/db/pocketbase";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

type Props = {
  token: string;
};

export default function AgentResetPasswordForm(props: Props) {
  const { token } = props;
  const [, navigate] = useLocation();

  const [status, setStatus] = useState<"loading" | "success" | "error" | "">(
    "",
  );

  /**
   * Auto redirect to login page
   */
  useEffect(() => {
    if (["success", "error"].includes(status)) {
      setTimeout(() => navigate("/login"), 4500);
    }
  }, [navigate, status]);

  /**
   * Handle form submit
   */
  async function handleAccept(password: string, confirmPassword: string) {
    setStatus("loading");
    try {
      await pb
        .collection("agents")
        .confirmPasswordReset(token, password, confirmPassword);

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Welcome to the team !
        </CardTitle>

        {status === "" && (
          <CardDescription className="text-center">
            <p>Please set your own password below.</p>
            <p>Once done, you can log in and start serving the soup.</p>
          </CardDescription>
        )}
      </CardHeader>

      {(!status.length || status === "loading") && (
        <CardContent className="grid gap-4 text-sm">
          <ResetPassordForm
            loading={status === "loading"}
            onAccept={handleAccept}
          />
        </CardContent>
      )}

      <CardContent className="grid gap-4 text-center text-sm">
        {status === "success" && (
          <>
            <p>✅ Your password has been successfully reset.</p>
            <p>You will be redirected to login in a sec...</p>
          </>
        )}

        {status === "error" && (
          <>
            <p className="text-destructive">
              Invalid or expired token. Please contact admin.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
