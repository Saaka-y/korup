import { create } from "zustand";
type PageState = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
};

export const usePageStore = create<PageState>((set) => ({
  currentPage: "home",
  setCurrentPage: (page: string) => set({ currentPage: page }),
}));

