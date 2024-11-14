"use client";
import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search } from "lucide-react";
import NotificationCard from "@/components/NotificationCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { getToken } from "@/lib/token";
import { Notification, Project } from "@/types";

export default function Home() {
  const [data, setData] = useState<{
    projects: Project[];
    notifications: Notification[];
  }>();
  useEffect(() => {
    (async () => {
      try {
        const token = getToken();
        if (!token) return;
        const response = await api.get("/", {
          headers: { Authorization: "Bearer " + token },
        });
        console.log("GETリクエストが成功しました", response.data);
        setData(response.data);
      } catch (error) {
        console.error("GETリクエストが失敗しました", error);
      }
    })();
  }, []);

  const user = true;
  return (
    <div className="container mx-auto py-8">
      {user ? (
        <div className="px-6">
          <h1 className="text-xl md:text-3xl font-semibold">Dashboard</h1>
          <div className="grid md:grid-cols-3 gap-8 xl:gap-20 py-10">
            <div className="flex flex-col gap-8 md:col-span-2">
              <div className="relative flex gap-4">
                <Search
                  size={20}
                  className="stroke-muted-foreground absolute m-2.5"
                />
                <Input className="pl-10" placeholder="プロジェクトを検索" />
                <Button className="bg-green-700 text-primary font-semibold hover:bg-green-800">
                  検索
                </Button>
              </div>
              {data?.projects.map((project) => (
                <ProjectCard user={true} project={project} key={project.id} />
              ))}
            </div>
            <div className="font-semibold text-xl space-y-4 md:col-span-1">
              <h2>通知</h2>
              {data?.notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center max-w-screen-md container mx-auto px-6">
          <h1 className="text-3xl md:text-5xl text-center font-semibold py-10 md:leading-relaxed">
            クリエイターがつながる場所
            <div className="text-green-400">PictHub</div>
          </h1>
          <h2 className="text-base md:text-xl py-4 leading-relaxed">
            イラストやアート作品の制作過程も、完成作品も、すべてここで一元管理。PictHubで、あなたのアートの成長を見届けましょう。
          </h2>
          <div className="flex justify-center py-10">
            <Button size={"lg"} asChild className="font-semibold text-base">
              <Link href={"/signup"}>
                PictHubを始める
                <ChevronRight />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
