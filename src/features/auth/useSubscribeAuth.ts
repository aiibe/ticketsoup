import { pb } from "@/lib/db/pocketbase";
import { useEffect } from "react";
import useAuthStore from "./useAuthStore";

export default function useSubscribeAuth() {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    pb.authStore.onChange(() => {
      if (pb.authStore.isValid) {
        setAuth(true);
      }
    });
  }, [setAuth]);
}
