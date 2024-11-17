"use client";
import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NotificationCard from "@/components/NotificationCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { getToken } from "@/lib/token";
import { Notification, Project } from "@/types";

export default function Home() {
  const [data, setData] = useState<{
    projects: Project[];
    notifications: Notification[];
    user_id: number;
  }>();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const response = await api.get(
        `/?search=${searchInput}`,
        token
          ? {
              headers: { Authorization: "Bearer " + token },
            }
          : {}
      );
      console.log("GETリクエストが成功しました", response.data);
      setData(response.data);
    } catch (error) {
      console.error("GETリクエストが失敗しました", error);
    }
  };

  return (
    <div
      className={`container mx-auto py-8 ${
        data?.user_id ? "" : "max-w-screen-lg"
      }`}
    >
      <div className="px-6">
        <h1 className="text-xl md:text-3xl font-semibold">Dashboard</h1>
        <div
          className={`grid ${
            data?.user_id ? "md:grid-cols-3" : ""
          } gap-8 xl:gap-20 py-10`}
        >
          <div className="flex flex-col gap-8 md:col-span-2">
            <div className="relative flex gap-4 items-center">
              <Search
                size={20}
                className="stroke-muted-foreground absolute m-2.5"
              />
              <Input
                className="pl-10"
                placeholder="プロジェクトを検索"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <div className="flex items-center">
                <Button
                  onClick={fetchContent}
                  className="bg-green-700 text-primary font-semibold hover:bg-green-800"
                >
                  検索
                </Button>
                <Button
                  variant={"link"}
                  size={"sm"}
                  className="text-muted-foreground"
                  onClick={() => {
                    setSearchInput("");
                    fetchContent();
                  }}
                >
                  クリア
                </Button>
              </div>
            </div>
            {data &&
              [...data.projects].map((project) => (
                <ProjectCard user={true} project={project} key={project.id} />
              ))}
          </div>
          {data?.user_id && (
            <div className="font-semibold text-xl space-y-4 md:col-span-1">
              <h2>通知</h2>
              {data.notifications.length === 0 && (
                <div className="text-lg font-normal text-muted-foreground">
                  通知はありません
                </div>
              )}
              {[...data.notifications].reverse().map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
