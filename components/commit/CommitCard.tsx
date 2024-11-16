import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Commit } from "@/app/[username]/[projectId]/commits/page";

const CommitCard = ({ commit }: { commit: Commit }) => {
  const format = (newDate: Date) => {
    const date = new Date(newDate);
    const formatDate = date.toISOString().split("T")[1].substring(0, 8);
    return formatDate;
  };

  return (
    <div>
      <Card className="flex flex-col md:flex-row justify-between border-none">
        <CardHeader className="p-4">
          <CardTitle className="text-base md:text-lg font-semibold">
            <Link
              href={"/username/project/commits/commitId"}
              className="h-fit hover:underline"
            >
              {commit.commit_message}
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
                committed on {format(commit.created_at)}
              </div>
            </div>
            <p className="text-muted-foreground pt-2 md:pt-0">{commit.id}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 px-4 pb-4 md:p-4">
          <Link href={`/username/projectId/commits/commitId`}>
            <img
              src={`data:image/png;base64,${commit.commit_image}`}
              alt="コミット画像"
              className="w-full md:w-72 md:max-h-40 object-contain object-right block rounded-md"
            />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommitCard;
