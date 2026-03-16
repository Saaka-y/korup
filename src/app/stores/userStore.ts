import { create } from "zustand";

type UserStore = {
    username: string;
    student_number?: number;
    tutor_number?: number;
    role: string;
    email: string;
    loggedIn: boolean;
    setUsername: (username: string) => void;
    setStudentNumber: (student_number: number) => void;
    setTutorNumber: (tutor_number: number) => void;
    setRole: (role: string) => void;
    setEmail: (email: string) => void;
    setLoggedIn: (loggedIn: boolean) => void;
};

export const useUserStore = create<UserStore>()((set) => ({
    username: "",
    student_number: undefined,
    tutor_number: undefined,
    role: "",
    email: "",
    loggedIn: false,

    setUsername: (username: string) => set({ username }),
    setStudentNumber: (student_number: number) => set({ student_number }),
    setTutorNumber: (tutor_number: number) => set({ tutor_number }),
    setRole: (role: string) => set({ role }),
    setEmail: (email: string) => set({ email }),
    setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
}));
