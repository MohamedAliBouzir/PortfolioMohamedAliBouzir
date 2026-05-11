"use client";

import { create } from "zustand";

interface UIState {
  mobileNavOpen: boolean;
  activeSection: string;
  cursorVariant: "default" | "hover" | "click" | "text";
  setMobileNavOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;
  setCursorVariant: (variant: UIState["cursorVariant"]) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileNavOpen: false,
  activeSection: "hero",
  cursorVariant: "default",
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
