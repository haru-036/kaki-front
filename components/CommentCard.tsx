import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const CommentCard = () => {
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
            <Link href={`/user`}>username</Link>
          </CardTitle>
          <CardDescription className="m-0">
            commented 2 hours ago
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
          asperiores maxime possimus. Minima facilis dolor nam, reiciendis
          eveniet assumenda voluptatem. Amet animi corrupti perspiciatis vero
          debitis suscipit sunt aliquam obcaecati!
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentCard;
