import { create } from "zustand";
import { persist } from "zustand/middleware";

type userStore = {
  username: string;
  id: number;
  role: string;
  email: string;
  loggedIn: boolean;
  setUsername: (username: string) => void;
  setId: (id: number) => void;
  setRole: (role: string) => void;
  setEmail: (email: string) => void;
  setLoggedIn: (loggedIn: boolean) => void;
};


export const useUserStore = create<userStore>()(
  persist(
    (set) => ({
      username: "",
      id: 0,
      role: "",
      email: "",
      loggedIn: false,

      setUsername: (username: string) => set({ username }),
      setId: (id: number) => set({ id }),
      setRole: (role: string) => set({ role }),
      setEmail: (email: string) => set({ email }),
      setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
    }),
    {
      name: "user-storage",
    }
  )
);

