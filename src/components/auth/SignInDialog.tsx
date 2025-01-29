import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface SignInDialogProps {
  openDialog: boolean;
  closeDialog: (open: boolean) => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({
  openDialog,
  closeDialog,
}) => {
  // ユーザー情報のコンテキストを取得
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  // Convexのミューテーションを使用して、新規ユーザーをDBに登録
  const CreateUser = useMutation(api.users.CreateUser);

  // Googleログイン処理
  const googleLogin: () => void = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Googleの認証に成功:", tokenResponse);

      // GoogleのOAuth APIを使ってユーザー情報を取得
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log("取得したユーザー情報:", userInfo);
      const user = userInfo.data;

      // 取得したユーザー情報をDB（Convex）に保存
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: user?.sub, // ユーザーID（UUIDを生成）
      });

      // ユーザー情報をローカルストレージに保存（ページ更新後も情報を保持するため）
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // グローバルなユーザー情報を更新（ただし、このファイル内では `userDetail` を使っていない）
      setUserDetail(user);

      // ダイアログを閉じる
      closeDialog(false);
    },
    onError: (errorResponse) =>
      console.log("Googleログインエラー:", errorResponse),
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
            <Button
              onClick={() => googleLogin()}
              className="bg-primary text-white hover:bg-primary/70 mt-4"
            >
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
