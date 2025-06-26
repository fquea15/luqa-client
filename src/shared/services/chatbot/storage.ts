import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "chatMessages";

export interface StoredMessage {
  id: string;
  text: string;
  from: "user" | "bot";
}

const MAX_MESSAGES = 10;

export const saveMessage = async (newMessage: StoredMessage) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed: StoredMessage[] = existing ? JSON.parse(existing) : [];

    const updated = [newMessage, ...parsed].slice(0, MAX_MESSAGES);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Error al guardar mensaje:", err);
  }
};

export const getMessages = async (): Promise<StoredMessage[]> => {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Error al leer mensajes:", err);
    return [];
  }
};

export const clearMessages = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Error al limpiar mensajes:", err);
  }
};
