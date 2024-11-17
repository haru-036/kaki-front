import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Commit } from "@/app/[username]/[projectId]/commits/page";
import UserIcon from "../UserIcon";

const CommitCard = ({
  commit,
  userId,
  projectId,
}: {
  commit: Commit;
  userId: string;
  projectId: string;
}) => {
  const format = (newDate: Date) => {
    const date = new Date(newDate);
    const formatDate = date.toISOString().split("T")[1].substring(0, 5);
    return formatDate;
  };

  return (
    <div>
      <Card className="flex flex-col md:flex-row justify-between border-none">
        <CardHeader className="p-4">
          <CardTitle className="text-base md:text-lg font-semibold">
            <Link
              href={`/${userId}/${projectId}/commits/${commit.id}`}
              className="h-fit hover:underline"
            >
              {commit.commit_message}
            </Link>
          </CardTitle>
          <CardDescription className="flex flex-col justify-between h-full">
            <div className="flex gap-2 items-center">
              <Link
                href={`/${commit.created_user_id}`}
                className="flex gap-2 items-center"
              >
                <UserIcon
                  username={commit.created_username}
                  src={commit.created_user_profile_image}
                  className="w-5 h-5"
                />
                <p className="text-xs text-muted-foreground hover:underline">
                  {commit.created_username}
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
