import { pb } from "@/lib/db/pocketbase";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);

  useEffect(() => {
    pb.authStore.onChange(() => {
      setIsLoggedIn(pb.authStore.isValid);
    });
  }, []);

  return { isLoggedIn, isSuperUser: pb.authStore.isSuperuser };
}
