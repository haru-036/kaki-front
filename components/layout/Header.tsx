import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-secondary">
        <Link href={"/"} className="text-lg font-semibold">
          イラスト版GitHub {/* ロゴにしたい */}
        </Link>

        {/* 一意のユーザー名をリンクにする */}
        <Link href={`/user`}>
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
