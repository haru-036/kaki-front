import {
  Card,
  CardDescription,
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
  return (
    <Link href={`/${project.created_user_id}/${project.id}`} className="h-fit">
      <Card className="hover:bg-secondary flex justify-between gap-0 flex-wrap">
        <div>
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
          {/* <CardFooter>
            <div className="text-xs text-muted-foreground">
              created at {project.created_at && format(project.created_at)}
            </div>
          </CardFooter> */}
        </div>
        <div className="p-4">
          <img
            src={`data:image/png;base64,${project.latest_commit_image}`}
            alt="コミット画像"
            className="w-fit md:max-h-40 max-h-40 object-contain object-right block rounded-md"
          />
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;
