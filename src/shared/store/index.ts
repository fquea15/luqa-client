import { create } from "zustand";
import { createUserSlice, UserState } from "./slices/user-slice";
type AppState = UserState;
export const useAppStore = create<AppState>((set, get) => ({
  ...createUserSlice(set, get),

}));