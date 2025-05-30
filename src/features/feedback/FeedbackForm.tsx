import { createFeedback } from "@/api/tickets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const message = form.message.value;

    const { error, data } = await createFeedback({ fullName, email, message });
    if (error) console.log(error);
    if (data) {
      setSubmitted(true);
    }
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          {submitted ? "Thanks for your feedback!" : "Feedback"}
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        {submitted && (
          <p className="text-center">We will get back to you soon</p>
        )}

        {!submitted && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="John Doe"
                required
              />
            </div>

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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
