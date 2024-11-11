import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  const user = true;
  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <Link href={"/"} className="text-lg font-semibold">
          <Avatar className="bg-white">
            <AvatarImage src="/logo.png" />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
        </Link>

        {/* 一意のユーザー名をリンクにする */}
        {user ? (
          <Link href={`/1`}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Button asChild variant={"ghost"}>
            <Link href={"/login"}>ログイン</Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default Header;
