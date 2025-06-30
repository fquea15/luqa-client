import { IChatIaMessage } from "@/shared/interfaces/chat-ia-interface";

export type ChatIaState = {
  // state
  messages: IChatIaMessage[] | [];

  // set
  setMessages: (messages: IChatIaMessage[]) => void;

  // actions
  addMessage: (message: IChatIaMessage | null) => void;
};

export const createChatIaSlice = (
  set: (partial: Partial<ChatIaState>) => void,
  get: () => ChatIaState
) => ({
  messages: [] as IChatIaMessage[] | [],
  setMessages: (messages: IChatIaMessage[]) => {
    set({ messages });
  },

  addMessage: (message: IChatIaMessage | null) => {
    const { messages } = get();
    console.log(message);
    if (!message) {
      set({ messages });
    }
    set({ messages: [...(messages || []), message!] });
  },
});
