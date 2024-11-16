import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Comment } from "@/types";

const CommentCard = ({ comment }: { comment: Comment }) => {
  const format = (newDate: Date) => {
    const date = new Date(newDate);
    const formatDate = date.toISOString().split("T")[1].substring(0, 8);
    return formatDate;
  };

  return (
    <div className="flex items-start gap-4">
      <Link href={`/user`}>
        <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <Card className="w-full">
        <CardHeader className="bg-muted flex flex-row items-baseline gap-4 py-2 px-4">
          <CardTitle className="text-base">
            <Link href={`/user`}>{comment.user.username}</Link>
          </CardTitle>
          <CardDescription className="m-0">
            commented {format(comment.created_at)}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">{comment.content}</CardContent>
      </Card>
    </div>
  );
};

export default CommentCard;
