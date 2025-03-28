import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { Link } from "wouter";
import { ClientResponseError } from "pocketbase";
import { requestOTP, verifyOTP } from "@/api/otp";

type Props = {
  title?: string;
  description?: ReactNode;
  type: "agent" | "customer";
  onSuccess?: () => void;
  onError?: (error: ClientResponseError["data"]) => void;
};

export default function OtpForm(props: Props) {
  const { title = "Login", description = null } = props;
  const { onSuccess, onError, type = "agent" } = props;
  const [otpId, setOtpId] = useState("");

  const isAgent = type === "agent";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const collection = isAgent ? "agents" : "customers";

    if (!otpId) {
      const email = form.email.value;
      const { error, data } = await requestOTP(collection, email);
      if (error) onError?.(error);
      if (data) setOtpId(data.otpId);
    } else {
      const code = form.code.value;
      const { data, error } = await verifyOTP(collection, otpId, code);
      if (error) onError?.(error);
      if (data) onSuccess?.();
    }
  }

  return (
    <Card className="mx-2 w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isAgent ? "Agent Login" : title}
        </CardTitle>

        <CardDescription>
          {isAgent && (
            <Link className="underline" to="/_admin/login">
              Or log in as admin
            </Link>
          )}

          {description}
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
  );
}
