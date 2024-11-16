import { CalendarDays } from "lucide-react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Notification } from "@/types";
import { Button } from "./ui/button";
import UserIcon from "./UserIcon";
import { getToken } from "@/lib/token";
import api from "@/lib/axios";
import Link from "next/link";

const NotificationCard = ({
  small,
  notification,
}: {
  small?: boolean;
  notification: Notification;
}) => {
  const handleNotificationResponse = async (response: string) => {
    try {
      const token = getToken();
      if (!token) return;
      const res = await api.patch(
        `/notification/${notification.id}/respond/${response}`,
        { response: response },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const format = (newDate: Date) => {
    const date = new Date(newDate);
    const formatDate = date.toISOString().split("T")[0];
    const formatTime = date.toISOString().split("T")[1].substring(0, 5);
    return `${formatDate} ${formatTime}`;
  };

  return (
    <Card className="md:max-w-lg">
      <CardHeader
        className={`pb-4 space-y-0 flex ${
          small ? "flex-col" : "flex-row"
        } flex-col xl:flex-row xl:items-center gap-2`}
      >
        <Link
          href={`/${notification.from_user.user_id}`}
          className="flex items-center gap-2 hover:underline"
        >
          <UserIcon
            username={notification.from_user.username}
            src={notification.from_user.profile_image}
            className="w-7 h-7"
          />
          <h4 className="text-sm font-semibold">
            {notification.from_user.username}
          </h4>
        </Link>
        <p className="text-muted-foreground text-sm font-normal pt-1">
          <Link
            href={`/${notification.from_user.user_id}/${
              notification.project.project_id
            }${
              notification.commit.commit_id
                ? `/commits/${notification.commit.commit_id}`
                : ``
            }`}
            className="font-semibold hover:underline"
          >
            {notification.project.name}
          </Link>
          に{notification.type === "invite" ? "招待されました" : "コメント"}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-normal"></p>
        {notification.type === "invite" && (
          <div className="flex gap-3 flex-wrap">
            <Button
              size={"sm"}
              className=""
              onClick={() => handleNotificationResponse("accept")}
            >
              受け入れる
            </Button>
            <Button
              size={"sm"}
              variant={"ghost"}
              className=""
              onClick={() => handleNotificationResponse("decline")}
            >
              拒否する
            </Button>
          </div>
        )}
        <div className="flex items-center pt-3">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
          <span className="text-xs font-normal text-muted-foreground">
            {format(notification.created_at)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
