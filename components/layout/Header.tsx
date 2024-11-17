"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import UserIcon from "../UserIcon";

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
            {/* <NotificationPopover /> */}
            <Link href={`/${user.user_id}`}>
              <UserIcon username={user.username} src={user.profile_image} />
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
