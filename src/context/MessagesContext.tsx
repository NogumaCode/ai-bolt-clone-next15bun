import { createContext, Dispatch, SetStateAction } from "react";

// メッセージの型定義
export interface Message {
  role: string; 
  content: string;
}

// Contextの型定義
export interface MessagesContextType {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>; 
}

// デフォルト値を設定
export const MessagesContext = createContext<MessagesContextType>({
  messages: [],
  setMessages: () => {},
});
