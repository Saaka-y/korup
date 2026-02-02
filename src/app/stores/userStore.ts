import { create } from "zustand";
type userStore = {
  status: boolean;
  userName: string;
  setStatus: (status: boolean) => void;
  setUsername: (name: string) => void;
};

export const useUserStore = create<userStore>((set) => ({
  status: false,
  userName: "",

  setStatus: (status: boolean) => set({ status }),
  setUsername: (name: string) => set({ userName: name }),
}));

