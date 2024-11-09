import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, History, Tag } from "lucide-react";
import Link from "next/link";

const Project = () => {
  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-xl">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">Project名</h2>
        <Button asChild className="font-semibold" variant={"outline"}>
          <Link href={"/newCommit"}>Add file</Link>
        </Button>
      </div>

      <div className="flex gap-10 py-8">
        <div className="w-3/4 border border-input rounded-md">
          <div className="flex justify-between items-center bg-white bg-opacity-5 py-3 px-3 border-b border-input">
            <div className="flex gap-2 items-center">
              <Button asChild variant={"link"} size={"sm"} className="px-2">
                <Link href={"/1"}>
                  <Avatar className="w-5 h-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-sm">username</p>
                </Link>
              </Button>
              <p className="text-sm">コミットメッセージ</p>
            </div>
            <div className="text-sm text-muted-foreground flex gap-4 items-center">
              <p>8888</p>
              <p>1days ago</p>
              <Link
                href={"/"}
                className="text-primary flex items-center gap-0.5 px-2 py-1 hover:bg-muted rounded"
              >
                <History size={16} />3 commits
              </Link>
            </div>
          </div>
          <div className="w-full p-5">
            <div className="aspect-video bg-neutral-300 w-full rounded"></div>
          </div>
        </div>

        <div className="w-1/4">
          <div>
            <h3 className="font-semibold py-5 leading-snug">About</h3>
            <p className="leading-relaxed">
              概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト概要テキスト
            </p>
          </div>

          {/* ここから下は余力があれば */}
          <div className="text-muted-foreground flex gap-2 text-sm items-center py-4">
            <Eye size={16} />
            <span className="font-semibold">0</span> Watching
          </div>
          <div className="py-4 border-t border-border">
            <h3 className="pb-3 flex items-center gap-2">
              <Tag size={16} />
              Tags
            </h3>
            <div className="flex gap-2 flex-wrap">
              <Badge>風景画</Badge>
              <Badge>人物画</Badge>
              <Badge>マンガ</Badge>
              <Badge>ロゴ</Badge>
              <Badge>イラスト</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
