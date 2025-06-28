import { IChatIaMessage } from "@/shared/interfaces/chat-ia-interface";

export type ChatIaState = {
  // state
  messages: IChatIaMessage[] | [];

  // set
  setMessages: (messages: IChatIaMessage[]) => void;

  // actions
  addMessage: (message: IChatIaMessage | null) => void;
};

export const createUserSlice = (
  set: (partial: Partial<ChatIaState>) => void,
  get: () => ChatIaState
) => ({
  messages: [] as IChatIaMessage[] | [],
  setMessages: (messages: IChatIaMessage[]) => {
    set({ messages });
  },

  addMessage: (message: IChatIaMessage | null) => {
    const { messages } = get();
    if (message) {
      set({ messages: [message, ...(messages || [])] });
    }
    set({ messages });
  },
});
