"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const Settings = () => {
  const params = useParams();
  if (!params.username || !params.projectId) return;

  const handleDelete = async () => {};

  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-md">
      <Link href={`/${params.username}/${params.projectId}`}>
        <h3 className="pb-2 text-blue-400 hover:underline tracking-wide">
          {params.projectId} /
        </h3>
      </Link>
      <h3 className="font-semibold text-2xl">設定</h3>
      <div className="py-4">
        <h4 className="text-lg pb-2">削除</h4>
        <Button variant={"destructive"} onClick={handleDelete}>
          プロジェクト削除する
        </Button>
      </div>
    </div>
  );
};

export default Settings;
