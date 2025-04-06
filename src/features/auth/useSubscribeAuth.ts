import useAuthStore from "@/features/auth/useAuthStore";
import { pb } from "@/lib/db/pocketbase";
import { useEffect } from "react";

export default function useSubscribeAuth() {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    pb.authStore.onChange(() => {
      if (pb.authStore.isValid) {
        setAuth(pb.authStore);
      }
    });
  }, [setAuth]);
}
