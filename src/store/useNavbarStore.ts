import { create } from "zustand";

interface NavbarState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useNavbarStore = create<NavbarState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
