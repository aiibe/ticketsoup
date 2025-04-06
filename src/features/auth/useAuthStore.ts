import { pb } from "@/lib/db/pocketbase";
import { create } from "zustand";

type AuthState = {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  clear: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  auth: pb.authStore.isValid,
  setAuth: (auth) => set({ auth }),
  clear: () => {
    pb.authStore.clear();
    set({ auth: false });
  },
}));

export default useAuthStore;
