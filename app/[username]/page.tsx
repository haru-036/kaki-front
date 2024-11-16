"use client";
import { AuthContext } from "@/components/AuthProvider";
import ProjectCard from "@/components/ProjectCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { getToken } from "@/lib/token";
import { Project } from "@/types";
import { BookMarked } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type ProfileData = {
  username: string;
  projects: Project[];
  profile_image: string;
  user_id: number;
};

const Profile = () => {
  const params = useParams();
  const [data, setData] = useState<ProfileData | null>(null);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const token = getToken();
        const res = await api.get(
          `/profile/${params.username}`,
          token
            ? {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            : {}
        );
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [params]);

  const handleLogout = async () => {
    const result = confirm("ログアウトしますか？");
    if (result) {
      logout();
      console.log("ログアウトしました");
    }
  };

  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-xl flex flex-col md:flex-row gap-8">
      {data ? (
        <>
          <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
            <Avatar className="w-24 h-24 md:w-64 md:h-64 lg:w-72 lg:h-72">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="py-4">
              <h2 className="font-semibold text-2xl">{data.username}</h2>
            </div>
            {user && (
              <Button
                variant={"secondary"}
                onClick={handleLogout}
                className="block w-full"
              >
                ログアウト
              </Button>
            )}
          </div>
          <div className="space-y-2 w-full">
            <div className="flex justify-between items-end">
              <h3 className="text-lg">プロジェクト一覧</h3>
              {data.user_id === user?.user_id && (
                <Button
                  size={"sm"}
                  asChild
                  className="bg-green-700 text-primary font-semibold hover:bg-green-800"
                >
                  <Link href={`/${params.username}/new`}>
                    <BookMarked />
                    新規作成
                  </Link>
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {data.projects.reverse().map((project) => (
                <ProjectCard user={false} project={project} key={project.id} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>このユーザーは存在しません</div>
      )}
    </div>
  );
};

export default Profile;
