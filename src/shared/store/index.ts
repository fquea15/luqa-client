// src/shared/store/index.tsx
import { create } from "zustand";
import { createModalSlice, ModalState } from "./slices/modal-slice";
import { createUserSlice, UserState } from "./slices/user-slice";
import { ChatIaState, createChatIaSlice } from "@/shared/store/slices/chat-ia-slice";

type AppState = UserState & ModalState & ChatIaState;

export const useAppStore = create<AppState>((set, get) => ({
  ...createUserSlice(set, get),
  ...createModalSlice(set),
  ...createChatIaSlice(set, get),
}));
