import { CalendarDays } from "lucide-react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NoticeCard = () => {
  return (
    <Card className="max-w-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h4 className="text-sm font-semibold">username</h4>
          <p className="text-muted-foreground text-sm font-normal">
            commented to プロジェクト名
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-normal">
          コメント内容コメント内容コメント内容コメント内容コメント内容コメント内容コメント内容コメント内容コメント内容コメント内容コメント内容
        </p>
        <div className="flex items-center pt-3">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
          <span className="text-xs text-muted-foreground">
            December 7, 2021
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoticeCard;
