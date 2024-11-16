import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Project } from "@/types";
import UserIcon from "./UserIcon";

const ProjectCard = ({
  user,
  project,
}: {
  user: boolean;
  project: Project;
}) => {
  const format = (newDate: Date) => {
    const date = new Date(newDate);
    const formatDate = date.toISOString().split("T")[0];
    const formatTime = date.toISOString().split("T")[1].substring(0, 5);
    return `${formatDate} ${formatTime}`;
  };

  return (
    <Link href={`/1/${project.id}`} className="h-fit">
      <Card className="hover:bg-secondary">
        <CardHeader className="space-y-4 pb-4">
          {user && (
            <div className="flex gap-2 items-center">
              <UserIcon
                username={project.created_username}
                src={project.created_user_profile_image}
                className="w-7 h-7"
              />
              <p className="">{project.created_username}</p>
            </div>
          )}
          <CardTitle className="text-xl">{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        {/* タグを入れるならBadgeを使う <CardContent>タグ</CardContent> */}
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            created at {project.created_at && format(project.created_at)}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
