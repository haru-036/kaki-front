import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NoticeCard from "@/components/NoticeCard";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-semibold">Home</h1>
      <div className="grid grid-cols-3 gap-20 py-10">
        <div className="flex flex-col gap-8 col-span-2">
          <div className="relative">
            <Search
              size={20}
              className="stroke-muted-foreground absolute m-2.5"
            />
            <Input className="pl-10" placeholder="プロジェクトを検索" />
          </div>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
        <div className="font-semibold text-xl space-y-4 col-span-1">
          <h2>通知</h2>
          <NoticeCard />
          <NoticeCard />
          <NoticeCard />
          <NoticeCard />
        </div>
      </div>
    </div>
  );
}
