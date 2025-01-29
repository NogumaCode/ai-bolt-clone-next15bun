import { createContext, Dispatch, SetStateAction } from "react";
import { Id } from "../../convex/_generated/dataModel";

// メッセージの型定義
export interface UserDetail {
  _id: Id<"users">; 
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