import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type Props = {
  loading: boolean;
  onAccept: (password: string, confirmPassword: string) => void;
};

export default function ResetPassordForm(props: Props) {
  const { onAccept } = props;
  const { loading } = props;

  const [error, setError] = useState<{
    password?: string;
    confirmPassword?: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const form = event.target as HTMLFormElement;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (!password) {
      return setError({ password: "Please enter a password" });
    }

    if (password.length < 8) {
      return setError({ password: "Password must be at least 8 characters" });
    }

    if (password !== confirmPassword) {
      return setError({ confirmPassword: "Passwords do not match" });
    }

    await onAccept(password, confirmPassword);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            name="password"
            placeholder="New password"
            type="password"
          />
          {error?.password && (
            <p className="text-destructive text-xs italic">{error.password}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
          />
          {error?.confirmPassword && (
            <p className="text-destructive text-xs italic">
              {error.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
    </form>
  );
}
