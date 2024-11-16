"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import NotificationPopover from "../NotificationPopover";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

const Header = () => {
  const { user } = useContext(AuthContext);
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
            <Link href={`/${user.user_id}`}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        ) : (
          <Button asChild variant={"outline"} className="font-medium">
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
