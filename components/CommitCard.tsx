import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CommitCard = () => {
  return (
    <div>
      <Card className="flex justify-between border-none">
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-semibold">
            <Link
              href={"/username/project/commits/commitId"}
              className="h-fit hover:underline"
            >
              コミットメッセージ
            </Link>
          </CardTitle>
          <CardDescription className="flex flex-col justify-between h-full">
            <div className="flex gap-2 items-center">
              <Link href={`/1`} className="flex gap-2 items-center">
                <Avatar className="w-5 h-5">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground hover:underline">
                  username
                </p>
              </Link>
              <div className="text-xs text-muted-foreground">
                committed on December 7, 2021
              </div>
            </div>
            <p className="text-muted-foreground">e659d0</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <Link href={`/username/projectId/commits/commitId`}>
            <div className="w-64 aspect-video bg-neutral-400 rounded-md"></div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommitCard;
