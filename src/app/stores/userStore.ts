import { create } from "zustand";

type UserStore = {
    first_name: string;
    role: string;
    loggedIn: boolean;
    setFirstName: (first_name: string) => void;
    setRole: (role: string) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
    first_name: "",
    role: "",
    loggedIn: false,

    setFirstName: (first_name: string) => set({ first_name }),
    setRole: (role: string) => set({ role }),
    setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
    clearUser: () => set({ first_name: "", role: "", loggedIn: false }),
}));
