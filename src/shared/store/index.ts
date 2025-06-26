// src/shared/store/index.ts
import { create } from "zustand";
import { createModalSlice, ModalState } from "./slices/modal-slice";
import { createUserSlice, UserState } from "./slices/user-slice";

type AppState = UserState & ModalState;

export const useAppStore = create<AppState>((set, get) => ({
  ...createUserSlice(set, get),
  ...createModalSlice(set),
}));
