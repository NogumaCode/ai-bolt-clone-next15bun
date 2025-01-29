"use client";
import Header from "@/components/Header";
import { Message, MessagesContext } from "@/context/MessagesContext";
import { UserDetail, UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useConvex } from "convex/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const convex=useConvex();

  useEffect(()=>{
    const IsAuthenticated =async()=>{
      if (typeof window !== "undefined") {
        try{
          const userString=localStorage.getItem('user')
          if(!userString){
            console.warn("ローカルストレージに情報がありません");
            return;
          }

          const user = JSON.parse(userString);
          if(!user?.email){
            console.warn("ユーザー情報にメールアドレスがありません");
            return 
          }
          const result = await convex.query(api.users.GetUser,{
            email:user.email
          })

          if(result){

            console.log("データベースのユーザー情報:", result);
            setUserDetail(result);
          }else{
            console.warn("データーベースに存在しません");
          }

        }catch(error){
          console.error('ユーザー情報の取得に失敗しました',error);
        }         
        
      }
    }
    IsAuthenticated();
  },[convex])
    if (!process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY) {
      throw new Error("Google OAuthクライアントIDが環境変数にないです");
    }
  return (
    <div>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
        <UserDetailContext.Provider value={{userDetail,setUserDetail}}>        
        <MessagesContext.Provider value={{messages,setMessages}}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        {children}
      </NextThemesProvider>
      </MessagesContext.Provider>
      </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Provider;
