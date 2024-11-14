import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import NotificationPopover from "../NotificationPopover";

const Header = () => {
  const user = true;
  return (
    <header>
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="text-lg font-semibold">
            <Avatar className="bg-white">
              <AvatarImage src="/logo.png" />
              <AvatarFallback>LOGO</AvatarFallback>
            </Avatar>
          </Link>
          {/* {user && <PathnameProvider />} */}
        </div>

        {/* 一意のユーザー名をリンクにする */}
        {user ? (
          <div className="flex items-center gap-6">
            <NotificationPopover />
            <Link href={`/1`}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        ) : (
          <Button asChild variant={"ghost"} className="font-medium">
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
