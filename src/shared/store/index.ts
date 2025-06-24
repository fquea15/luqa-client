 // src/shared/store/index.ts
import { create } from "zustand";
import { createUserSlice, UserState } from "./slices/user-slice";
import { createModalSlice, ModalState } from "./slices/modal-slice";

type AppState = UserState & ModalState;

export const useBoundStore = create<AppState>((set, get) => ({
  ...createUserSlice(set, get),
  ...createModalSlice(set),
}));
