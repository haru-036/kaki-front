import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Project } from "@/types";

const ProjectCard = ({
  user,
  project,
}: {
  user: boolean;
  project: Project;
}) => {
  return (
    <Link href={`/1/project`} className="h-fit">
      <Card className="hover:bg-secondary">
        <CardHeader className="space-y-4 pb-4">
          {user && (
            <div className="flex gap-2 items-center">
              <Avatar className="w-7 h-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="">username</p>
            </div>
          )}
          <CardTitle className="text-xl">{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        {/* タグを入れるならBadgeを使う <CardContent>タグ</CardContent> */}
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Updated on December 7, 2021
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
