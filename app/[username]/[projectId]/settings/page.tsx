"use client";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { getToken } from "@/lib/token";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const Settings = () => {
  const params = useParams();
  const router = useRouter();
  if (!params.username || !params.projectId) return;

  const handleDelete = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const res = await api.delete(`/project/${params.projectId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = res.data;
      console.log(data);
      router.push(`/`);
    } catch (error) {
      console.error(error);
    }
  };

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
