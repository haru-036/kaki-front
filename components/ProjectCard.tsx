import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const ProjectCard = () => {
  return (
    <div>
      <Link href={"/"}>
        <Card className="hover:bg-secondary">
          <CardHeader className="space-y-4">
            <div className="flex gap-2 items-center">
              <Avatar className="w-7 h-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="">username</p>
            </div>
            <CardTitle>project名</CardTitle>
            <CardDescription>
              概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト
            </CardDescription>
          </CardHeader>
          {/* タグを入れるならBadgeを使う <CardContent>タグ</CardContent> */}
        </Card>
      </Link>
    </div>
  );
};

export default ProjectCard;
