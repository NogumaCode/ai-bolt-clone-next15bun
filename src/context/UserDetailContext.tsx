import { createContext, Dispatch, SetStateAction } from "react";

// メッセージの型定義
export interface UserDetail {
  uid: string; // Googleの `sub` (一意のID)
  name: string;
  email: string;
  picture?: string; // プロフィール画像は `undefined` も許容
  }

// Contextの型定義
export interface UserDetailContextType {
  userDetail: UserDetail | null;
  setUserDetail: Dispatch<SetStateAction<UserDetail | null>>;
}

// デフォルト値を設定
export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => {},
});