import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

const AddMember = async ({
  params,
}: {
  params: Promise<{ username: string; projectId: string }>;
}) => {
  const projectId = (await params).projectId;
  const userName = (await params).username;
  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-md">
      <Link href={`/${userName}/${projectId}`}>
        <h3 className="pb-2 text-blue-400 hover:underline tracking-wide">
          {projectId} /
        </h3>
      </Link>
      <h3 className="font-semibold text-2xl">メンバー</h3>
      <div className="py-4">
        <div className="border-border border rounded-lg flex flex-col items-start divide-y">
          <Button
            asChild
            variant={"link"}
            className="h-fit w-full justify-start p-4"
          >
            <Link href={"/1"}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg">username</p>
            </Link>
          </Button>
          <Button
            asChild
            variant={"link"}
            className="h-fit w-full justify-start p-4"
          >
            <Link href={"/1"}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg">username</p>
            </Link>
          </Button>
        </div>
      </div>

      <div className="py-8">
        <h4 className="font-semibold text-lg">メンバーを追加する</h4>
        <div className="relative flex gap-4 py-4">
          <Search
            size={20}
            className="stroke-muted-foreground absolute m-2.5"
          />
          <Input className="pl-10" placeholder="ユーザーを検索" />
          <Button className="bg-green-700 text-primary font-semibold hover:bg-green-800">
            検索
          </Button>
        </div>

        {/* このリストは検索結果 */}
        <div className="border-border border rounded-lg flex flex-col items-start divide-y">
          <div className="flex justify-between items-center w-full">
            <Button asChild variant={"link"} className="h-fit p-4">
              <Link href={"/1"}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-lg">username</p>
              </Link>
            </Button>
            <Button className="mx-4" size={"sm"}>
              追加
            </Button>
          </div>
          <div className="flex justify-between items-center w-full">
            <Button asChild variant={"link"} className="h-fit p-4">
              <Link href={"/1"}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-lg">username</p>
              </Link>
            </Button>
            <Button className="mx-4" size={"sm"}>
              追加
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
