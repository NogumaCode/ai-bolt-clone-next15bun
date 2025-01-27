import { createContext, Dispatch, SetStateAction } from "react";

// メッセージの型定義
export interface UserDetail {
    role: string;
    content: string;
    name?: string; // 名前を追加
  }

// Contextの型定義
export interface UserDetailContextType {
  userDetail: UserDetail[];
  setUserDetail: Dispatch<SetStateAction<UserDetail[]>>; 
}

// デフォルト値を設定
export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: [],
  setUserDetail: () => {},
});