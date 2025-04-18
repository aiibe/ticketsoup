import { Redirect, useLocation } from "wouter";
import useAuthStore from "@/features/auth/useAuthStore";
import { pb } from "@/lib/db/pocketbase";
import PasswordLogin from "@/features/auth/PasswordLogin";
import { useState } from "react";

export default function LoginPage() {
  const [, navigate] = useLocation();
  const [type, setType] = useState<"agent" | "customer" | "admin">("agent");
  const [formError, setFormError] = useState("");

  const isAuth = useAuthStore((state) => state.auth);
  if (isAuth) return <Redirect to="/" />;

  let collectionName = "agents";
  if (type === "customer") collectionName = "customers";
  if (type === "admin") collectionName = "_superusers";

  async function handleSubmit(email: string, password: string) {
    setFormError("");
    try {
      await pb.collection(collectionName).authWithPassword(email, password);
      navigate("/");
    } catch (error) {
      console.log((error as Error).message);
      setFormError("Invalid email or password");
    }
  }

  const handleChangeType = (type: "agent" | "customer" | "admin") => {
    setType(type);
    setFormError("");
  };

  return (
    <div className="flex w-full items-center justify-center">
      <PasswordLogin
        type={type}
        onChangeType={handleChangeType}
        error={formError}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
