import { create } from "zustand";

type UserStore = {
    username: string;
    role: string;
    loggedIn: boolean;
    setUsername: (username: string) => void;
    setRole: (role: string) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
    username: "",
    role: "",
    loggedIn: false,

    setUsername: (username: string) => set({ username }),
    setRole: (role: string) => set({ role }),
    setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
    clearUser: () => set({ username: "", role: "", loggedIn: false }),
}));
