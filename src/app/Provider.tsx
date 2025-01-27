"use client";
import Header from "@/components/Header";
import { Message, MessagesContext } from "@/context/MessagesContext";
import { UserDetail, UserDetailContext } from "@/context/UserDetailContext";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userDetail, setUserDetail] = useState<UserDetail[]>([]);
  return (
    <div>
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
    </div>
  );
};

export default Provider;
