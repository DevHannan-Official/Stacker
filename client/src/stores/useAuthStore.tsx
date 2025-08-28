import { create } from "zustand";

interface authStore {
  isFetching: boolean;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  setFetching: (isFetching: boolean) => void;
}

export const useAuthStore = create<authStore>((set) => ({
  user: null,
  isFetching: true,
  setUser: (user: User) => set({ user }),
  logout: () => set({ user: null }),
  setFetching: (isFetching: boolean) => set({ isFetching }),
}));
