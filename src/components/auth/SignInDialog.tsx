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

interface SignInDialogProps {
  openDialog: boolean;
  closeDialog: (open: boolean) => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({
  openDialog,
  closeDialog,
}) => {
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl text-white text-center">
            {lookup.SIGNIN_HEADING}
          </DialogTitle>

          <DialogDescription className="flex flex-col items-center justify-center text-center">
            <span className="mt-2">{lookup.SIGNIN_SUBHEADING}</span>
            <Button className="bg-primary text-white hover:bg-primary/70 mt-4">
              サインイン
            </Button>
            <span className="mt-4"> {lookup.SIGNIN_AGREEMENT_TEXT}</span>
          </DialogDescription>
        </DialogHeader>
       
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
