import { create } from "zustand";

type userStore = {
    username: string;
    id: number;
    student_id?: number;
    tutor_id?: number;
    role: string;
    email: string;
    loggedIn: boolean;
    setUsername: (username: string) => void;
    setId: (id: number) => void;
    setStudentId: (student_id: number) => void;
    setTutorId: (tutor_id: number) => void;
    setRole: (role: string) => void;
    setEmail: (email: string) => void;
    setLoggedIn: (loggedIn: boolean) => void;
};

export const useUserStore = create<userStore>()((set) => ({
    username: "",
    id: 0,
    student_id: undefined,
    tutor_id: undefined,
    role: "",
    email: "",
    loggedIn: false,

    setUsername: (username: string) => set({ username }),
    setId: (id: number) => set({ id }),
    setStudentId: (student_id: number) => set({ student_id }),
    setTutorId: (tutor_id: number) => set({ tutor_id }),
    setRole: (role: string) => set({ role }),
    setEmail: (email: string) => set({ email }),
    setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
}));
