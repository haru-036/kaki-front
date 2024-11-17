"use client";
import { AuthContext } from "@/components/AuthProvider";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import UserIcon from "@/components/UserIcon";
import api from "@/lib/axios";
import { getToken } from "@/lib/token";
import { Project } from "@/types";
import { BookMarked, Pencil } from "lucide-react";
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
  const [inputFile, setInputFile] = useState<File>();
  const { user, logout, updateUser } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(true);

  useEffect(() => {
    (async () => {
      if (!refreshKey) return;
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
        if (user && user.user_id === res.data.user_id) {
          updateUser({ ...user, profile_image: res.data.profile_image });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setRefreshKey(false);
      }
    })();
  }, [params, refreshKey]);

  const handleLogout = () => {
    const result = confirm("ログアウトしますか？");
    if (result) {
      logout();
      console.log("ログアウトしました");
    }
  };

  const handleEditUserImg = async () => {
    if (isLoading) return;
    const token = getToken();
    if (!token || data?.user_id !== user?.user_id || !inputFile) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("profile_image", inputFile);
      const res = await api.post(`/profile/${params.username}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(res.data);
      setOpenModal(false);
      setRefreshKey(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-xl flex flex-col md:flex-row gap-8">
      {data ? (
        <>
          <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
            <div className="relative">
              <UserIcon
                src={data.profile_image}
                username={data.username}
                className="w-24 h-24 md:w-64 md:h-64 lg:w-72 lg:h-72"
              />
              {user && user.user_id === data.user_id && (
                <Dialog open={openModal} onOpenChange={setOpenModal}>
                  <DialogTrigger asChild>
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      className="absolute left-0 bottom-3"
                    >
                      <Pencil />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>プロフィール画像を編集</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const files = event.currentTarget.files;
                          // ファイルがなければ終了
                          if (!files || files?.length === 0) return;
                          // 先頭のファイルを取得
                          const file = files[0];
                          setInputFile(file);
                        }}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        size={"sm"}
                        onClick={handleEditUserImg}
                        disabled={isLoading}
                      >
                        変更
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="py-4">
              <h2 className="font-semibold text-2xl">{data.username}</h2>
            </div>
            {user && user.user_id === data.user_id && (
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
            <div className="grid grid-cols-1 gap-4">
              {[...data.projects].reverse().map((project) => (
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
