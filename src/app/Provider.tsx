"use client";
import Header from "@/components/Header";
import { Message, MessagesContext } from "@/context/MessagesContext";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
  return (
    <div>
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
    </div>
  );
};

export default Provider;
