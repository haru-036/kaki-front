import CommentCard from "@/components/CommentCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const CommitDetail = async ({
  params,
}: {
  params: Promise<{ username: string; projectId: string }>;
}) => {
  const projectId = (await params).projectId;
  const userName = (await params).username;

  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-lg">
      <Link href={`/${userName}/${projectId}`}>
        <h3 className="pb-2 text-blue-400 hover:underline tracking-wide">
          {projectId} /
        </h3>
      </Link>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold pb-2">コミットメッセージ</h2>
          <div className="flex gap-2 items-center">
            <Link href={`/${userName}`} className="flex gap-2 items-center">
              <Avatar className="w-5 h-5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground hover:underline">
                username
              </p>
            </Link>
            <div className="text-xs text-muted-foreground">
              December 7, 2021
            </div>
          </div>
        </div>
        <p className="text-muted-foreground block">e659d0</p>
      </div>
      <div className="py-6">
        <div className="mx-auto aspect-video bg-neutral-300 h-full rounded max-h-[480px]"></div>
      </div>

      <div className="pt-6 pb-8 space-y-4">
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </div>

      <div className="flex gap-4 items-start border-t-2 border-border pt-4 pb-36">
        <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid w-full gap-2">
          <Label htmlFor="comment" className="text-base font-semibold">
            コメント
          </Label>
          <Textarea
            placeholder="Type your message here."
            id="comment"
            className="resize-none"
          />
          <Button className="bg-green-700 text-primary font-semibold hover:bg-green-800 w-fit my-2 ml-auto mr-0">
            コメント
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommitDetail;
