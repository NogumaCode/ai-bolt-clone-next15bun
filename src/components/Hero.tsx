"use client"
import lookup from "@/data/Lookup";
import { useContext, useState } from "react";
import { ArrowRight, Link } from "lucide-react";
import { Textarea } from "./ui/textarea";
import ColorsList from "@/data/Colors";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "./auth/SignInDialog";


const Hero = () => {
    const [userInput, setUserInput] =useState<string>();
    const {messages,setMessages} = useContext(MessagesContext);
    const {userDetail,setUserDetail} = useContext(UserDetailContext);
    const [openDialog,setOpenDialog] =useState(false);

    const onGenerate=(input:string)=>{
        if(!userDetail?.name){
            setOpenDialog(true);
            return;
        }
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "user", content: input }, 
          ]);

    }
  return (
    
    <div className="flex flex-col items-center mt-28 justify-center xl:mt-42 gap-2">
      <h2 className="text-4xl font-bold">{lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{lookup.HERO_DESC}</p>
      <div className="p-5 border rounded-xl max-w-xl w-full mt-3" style={{ backgroundColor: ColorsList.BACKGROUND }}>
        <div className="flex gap-2">
          <Textarea
            className="outline-none border-none bg-transparent w-full h-32 max-h-56 resize-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            placeholder={lookup.INPUT_PLACEHOLDER}
            onChange={(event)=>setUserInput(event.target.value)}
          />
          {userInput && <ArrowRight className="bg-primary p-2 h-10 w-10 rounded-md cursor-pointer" onClick={()=>onGenerate(userInput)} />}
        </div>
        <Link className="h-5 w-5" />
      </div>
    <div className="flex flex-wrap mt-8 max-w-2xl items-center justify-center gap-3">
        {lookup?.SUGGESTIONS.map((suggestion,index)=>(
            <h2 className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer" key={index} onClick={()=>onGenerate(suggestion)}>{suggestion}</h2>
        ))}

    </div>
    <SignInDialog openDialog={openDialog} closeDialog={setOpenDialog} />
    </div>
    
  );
};

export default Hero;
