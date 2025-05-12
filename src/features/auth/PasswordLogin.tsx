import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomerIcon } from "@/components/icons/CustomerIcon";
import { AgentIcon } from "@/components/icons/AgentIcon";
import { AdminIcon } from "@/components/icons/AdminIcon";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { JSX } from "react";

type Props = {
  type: "agent" | "customer" | "admin";
  onChangeType: (type: "agent" | "customer" | "admin") => void;
  onSubmit: (email: string, password: string) => void;
  error?: string;
};

export default function PasswordLogin(props: Props) {
  const { type, onChangeType, onSubmit, error } = props;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    onSubmit(email, password);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <LoginTypePicker currentType={type} onChangeType={onChangeType} />

        <CardTitle className="text-center text-2xl">
          <span className="capitalize">{type}</span> Login
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" name="email" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function LoginTypePicker(props: {
  currentType: "agent" | "customer" | "admin";
  onChangeType: (type: "agent" | "customer" | "admin") => void;
}) {
  const { currentType, onChangeType } = props;

  const loginTypes: {
    type: "agent" | "customer" | "admin";
    Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
    tooltip: string;
  }[] = [
    {
      type: "customer",
      Icon: CustomerIcon,
      tooltip: "Login as customer",
    },
    {
      type: "agent",
      Icon: AgentIcon,
      tooltip: "Login as agent",
    },
    {
      type: "admin",
      Icon: AdminIcon,
      tooltip: "Login as admin",
    },
  ];

  return (
    <div className="mb-2 flex justify-around">
      <TooltipProvider>
        {loginTypes.map(({ Icon, type, tooltip }) => (
          <Tooltip key={type}>
            <TooltipTrigger>
              <div
                className={cn(
                  "hover:bg-primary/5 cursor-pointer rounded-lg px-4 py-3",
                  currentType === type && "bg-primary/10",
                )}
                onClick={() => onChangeType(type)}
              >
                <Icon
                  className={cn(
                    "fill-muted-foreground",
                    currentType === type && "fill-primary",
                  )}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
