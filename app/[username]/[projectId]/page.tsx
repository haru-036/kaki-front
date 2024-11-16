"use client";
import { AuthContext } from "@/components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { getToken } from "@/lib/token";
import { User } from "@/types";
import { Eye, History, Settings, Tag, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type ProjectData = {
  project_id: number;
  name: string;
  description: string;
  is_public: boolean;
  latest_commit_image: string;
  created_user: number;
  project_member: User[];
};

const Project = () => {
  const params = useParams();
  const [project, setProject] = useState<ProjectData>();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const token = getToken();
        const res = await api.get(
          `/project/${params.projectId}`,
          token
            ? {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            : {}
        );
        console.log(res);
        setProject(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [params]);

  const handlePublic = async () => {
    if (!params.username || !params.projectId) return;
    const result = confirm("プロジェクトを公開しますか？");
    if (result) {
      try {
        const token = getToken();
        if (!token) return;
        const res = await api.patch(
          `/project/${params.projectId}`,
          {
            action: "toggle_visibility",
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await res.data;
        setProject(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container mx-auto py-10 px-6 md:px-8 max-w-screen-xl">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">{project?.name}</h2>
        {/* TODO: メンバーにも表示するようにする */}
        {user && (
          <div className="flex gap-3 items-center">
            <Button variant="outline" size="icon" asChild>
              <Link
                href={`/${params.username}/${params.projectId}/settings`}
                className="[&_svg]:size-5"
              >
                <Settings />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link
                href={`/${params.username}/${params.projectId}/addMember`}
                className="[&_svg]:size-5"
              >
                <Users />
              </Link>
            </Button>
            <Button asChild className="font-semibold" variant={"outline"}>
              <Link href={`/${params.username}/${params.projectId}/addCommit`}>
                Add file
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-10 py-8">
        <div className="w-full md:w-3/4 border border-input rounded-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white bg-opacity-5 py-3 px-3 border-b border-input">
            <div className="flex gap-2 items-center">
              <Button asChild variant={"link"} size={"sm"} className="px-2">
                <Link href={"/1"}>
                  <Avatar className="w-5 h-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-sm">username</p>
                </Link>
              </Button>
              <p className="text-sm">コミットメッセージ</p>
            </div>
            <div className="text-sm text-muted-foreground flex gap-4 items-center px-2 md:px-0">
              <p>8888</p>
              <p>1days ago</p>
              <Link
                href={`/${params.username}/${params.projectId}/commits`}
                className="text-primary flex items-center gap-0.5 px-2 py-1 hover:bg-muted rounded"
              >
                <History size={16} />3 commits
              </Link>
            </div>
          </div>
          <div className="w-full p-5 relative">
            {project && (
              <img
                src={`data:image/png;base64,${project.latest_commit_image}`}
                alt="コミット画像"
                className="w-full block"
              />
            )}
            {/* <div className="aspect-video bg-neutral-300 w-full rounded"></div> */}
          </div>
        </div>

        <div className="w-full md:w-1/4">
          <div>
            <h3 className="font-semibold py-5 leading-snug">About</h3>
            <p className="leading-relaxed">{project?.description}</p>
          </div>
          <div className="text-muted-foreground flex gap-2 text-sm items-center py-4">
            <Eye size={16} />
            <span className="font-semibold">0</span> Watching
          </div>
          <div className="py-4 border-t border-border">
            <h3 className="pb-3 flex items-center gap-2">
              <Tag size={16} />
              Tags
            </h3>
            <div className="flex gap-2 flex-wrap">
              <Badge>風景画</Badge>
              <Badge>人物画</Badge>
              <Badge>マンガ</Badge>
              <Badge>ロゴ</Badge>
              <Badge>イラスト</Badge>
            </div>
          </div>

          {project?.project_member && project.project_member.length > 0 && (
            <div className="py-4 border-t border-border">
              <h3 className="pb-3 flex items-center gap-2">
                <Users size={16} />
                Members
              </h3>
              <div className="flex gap-3 flex-wrap">
                {project?.project_member.map((member) => (
                  <Link href={`/${member.user_id}`} key={member.user_id}>
                    <Avatar>
                      <AvatarImage src={member.profile_image} />
                      <AvatarFallback>
                        {member.username.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="py-4 border-t border-border">
            <h3>公開設定</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm py-2">
                {project?.is_public ? "Public" : "Private"}
              </p>
              {!project?.is_public && user && (
                <Button onClick={handlePublic} size={"sm"} variant={"ghost"}>
                  プロジェクトを
                  {project?.is_public ? "非公開にする" : "公開する"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
