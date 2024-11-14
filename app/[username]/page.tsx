// import ProjectCard from "@/components/ProjectCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import api from "@/lib/axios";
import { BookMarked } from "lucide-react";
import Link from "next/link";

const Profile = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const userName = (await params).username;
  // const profile = await api.get(`/profile/${userName}`);

  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-xl flex flex-col md:flex-row gap-8">
      <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
        <Avatar className="w-24 h-24 md:w-64 md:h-64 lg:w-72 lg:h-72">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="py-4">
          <h2 className="font-semibold text-2xl">username</h2>
        </div>
      </div>
      <div className="space-y-2 w-full">
        <div className="flex justify-between items-end">
          <h3 className="text-lg">プロジェクト一覧</h3>
          <Button
            size={"sm"}
            asChild
            className="bg-green-700 text-primary font-semibold hover:bg-green-800"
          >
            <Link href={`/${userName}/new`}>
              <BookMarked />
              新規作成
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* <ProjectCard user={false} />
          <ProjectCard user={false} />
          <ProjectCard user={false} />
          <ProjectCard user={false} />
          <ProjectCard user={false} />
          <ProjectCard user={false} />
          <ProjectCard user={false} />
          <ProjectCard user={false} /> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
