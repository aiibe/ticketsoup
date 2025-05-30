import useAuthStore from "@/features/auth/useAuthStore";
import FeedbackForm from "@/features/feedback/FeedbackForm";
import { pb } from "@/lib/db/pocketbase";
import { Redirect } from "wouter";

export default function FeedbackPage() {
  const isAuth = useAuthStore((state) => state.auth);

  const isAdmin = pb.authStore?.isSuperuser && isAuth;
  if (!isAdmin) return <Redirect to="/" />;

  return (
    <div className="flex w-full justify-center">
      <FeedbackForm />
    </div>
  );
}
