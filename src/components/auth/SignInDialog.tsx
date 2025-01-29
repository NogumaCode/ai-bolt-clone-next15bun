import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext } from "react";

interface SignInDialogProps {
  openDialog: boolean;
  closeDialog: (open: boolean) => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({
  openDialog,
  closeDialog,
}) => {

  const {userDetail,setUserDetail}=useContext(UserDetailContext);

  
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log(tokenResponse);
    const userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: 'Bearer '+tokenResponse?.access_token } },
    );

    console.log(userInfo);
    setUserDetail(userInfo?.data)
    closeDialog(false)
  },
  onError: errorResponse => console.log(errorResponse),
});

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl text-white text-center">
            {lookup.SIGNIN_HEADING}
          </DialogTitle>

          <DialogDescription className="flex flex-col items-center justify-center text-center">
            <span className="mt-2">{lookup.SIGNIN_SUBHEADING}</span>
            <Button onClick={() => googleLogin()} className="bg-primary text-white hover:bg-primary/70 mt-4">
              Googleでサインイン
            </Button>
            <span className="mt-4"> {lookup.SIGNIN_AGREEMENT_TEXT}</span>
          </DialogDescription>
        </DialogHeader>
       
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
