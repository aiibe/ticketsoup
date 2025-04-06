import { createFeedback } from "@/api/tickets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAuthStore from "@/features/auth/useAuthStore";
import Section from "@/layouts/Section";
import { useState } from "react";
import { Redirect } from "wouter";

export default function Feedback() {
  const auth = useAuthStore((state) => state.auth);
  const [submitted, setSubmitted] = useState(false);

  const isAdmin = auth?.isSuperuser && auth?.isValid;
  if (!isAdmin) return <Redirect to="/" />;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const message = form.message.value;

    const { error, data } = await createFeedback({ email, message });
    if (error) console.log(error);
    if (data) {
      console.log(data);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="p-2">
        <h1 className="text-2xl font-bold">Thanks for your feedback!</h1>
      </div>
    );
  }

  return (
    <Section>
      <div className="max-w-md">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Feedback</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Your message"
                />
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
