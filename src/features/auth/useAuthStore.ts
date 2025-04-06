import { pb } from "@/lib/db/pocketbase";
import { BaseAuthStore } from "pocketbase";
import { create } from "zustand";

type AuthState = {
  auth: BaseAuthStore | null;
  setAuth: (auth: BaseAuthStore | null) => void;
  clear: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  auth: pb.authStore,
  setAuth: (auth) => set({ auth }),
  clear: () => {
    pb.authStore.clear();
    set({ auth: null });
  },
}));

export default useAuthStore;
