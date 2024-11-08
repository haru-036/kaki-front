import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Header = () => {
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
        <Link href={`/1`}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </>
  );
};

export default Header;
