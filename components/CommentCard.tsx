import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Comment } from "@/types";
import UserIcon from "./UserIcon";

const CommentCard = ({ comment }: { comment: Comment }) => {
  const format = (newDate: Date) => {
    const date = new Date(newDate);
    const formatDate = date.toISOString().split("T")[0];
    const formatTime = date.toISOString().split("T")[1].substring(0, 5);
    return `${formatDate} ${formatTime}`;
  };

  return (
    <div className="flex items-start gap-4">
      <Link href={`/${comment.user.user_id}`}>
        <UserIcon
          username={comment.user.username}
          src={comment.user.profile_image}
        />
      </Link>
      <Card className="w-full">
        <CardHeader className="bg-muted flex flex-row items-baseline gap-4 py-2 px-4">
          <CardTitle className="text-base">
            <Link href={`/${comment.user.user_id}`}>
              {comment.user.username}
            </Link>
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
