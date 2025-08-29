import { create } from "zustand";

interface authStore {
  isFetching: boolean;
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  setFetching: (isFetching: boolean) => void;
}

export const useAuthStore = create<authStore>((set) => ({
  user: null,
  isLoggedIn: false,
  isFetching: true,
  setUser: (user: User) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  setFetching: (isFetching: boolean) => set({ isFetching }),
}));
