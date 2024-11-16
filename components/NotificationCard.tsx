import { CalendarDays } from "lucide-react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Notification } from "@/types";

const NotificationCard = ({
  small,
  notification,
}: {
  small?: boolean;
  notification: Notification;
}) => {
  return (
    <Card className="max-w-lg">
      <CardHeader
        className={`pb-4 space-y-0 flex ${
          small ? "flex-col" : "flex-row"
        } flex-col xl:flex-row xl:items-center gap-2`}
      >
        <div className="flex items-center gap-2">
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h4 className="text-sm font-semibold">username</h4>
        </div>
        <p className="text-muted-foreground text-sm font-normal">
          commented to プロジェクト名
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-normal">{notification.message}</p>
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

export default NotificationCard;
