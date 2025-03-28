import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { requestAgentOTP, verifyAgentOTP } from "@/api/auth";
import { Link, Redirect, useLocation } from "wouter";
import useAuth from "@/hooks/useAuth";

export default function AgentLogin() {
  const [, navigate] = useLocation();
  const [otpId, setOtpId] = useState("");

  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return <Redirect to="/" />;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    if (!otpId) {
      const email = form.email.value;
      const { error, data } = await requestAgentOTP(email);
      if (error) console.log(error);
      if (data) {
        setOtpId(data.otpId);
      }
    } else {
      const code = form.code.value;
      const { data, error } = await verifyAgentOTP(otpId, code);
      if (error) console.log(error);
      if (data) {
        navigate("/");
      }
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Agent Login</CardTitle>
          <CardDescription>
            <Link className="underline" to="/_admin/login">
              Or log in as admin
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!otpId && (
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            )}

            {otpId && (
              <div className="grid gap-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="123456"
                  required
                />
              </div>
            )}

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
