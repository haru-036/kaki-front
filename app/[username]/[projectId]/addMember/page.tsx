"use client";
import { AuthContext } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserIcon from "@/components/UserIcon";
import api from "@/lib/axios";
import { getToken } from "@/lib/token";
import { User } from "@/types";
import { Search } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type SearchResult = {
  project_member: User[];
  users: [{ id: number; username: string; user_image: string }];
};

const AddMember = () => {
  const params = useParams();
  const [searchInput, setSearchInput] = useState("");
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [addMember, setAddMember] = useState<number[]>([]);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  useEffect(() => {
    handleSearchMember();
  }, []);

  const handleSearchMember = async () => {
    try {
      const token = getToken();
      const res = await api.get(
        `/project/${params.projectId}/invite?search=${searchInput}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      const data = res.data;
      setSearchResult(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMember = async (userId: number) => {
    try {
      const token = getToken();
      if (!token || !userId) return;
      const res = await api.post(
        `/project/${params.projectId}/invite`,
        { user_id: userId },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      const data = res.data;
      setAddMember((prev) => [...prev, userId]);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const invitemember = (id: number) => {
    return addMember.some((member) => member === id); // メンバーに含まれているかどうか
  };

  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-md">
      <Link href={`/${params.username}/${params.projectId}`}>
        <h3 className="pb-2 text-blue-400 hover:underline tracking-wide">
          {params.projectId} /
        </h3>
      </Link>
      <h3 className="font-semibold text-2xl">メンバー</h3>
      <div className="py-4">
        <div className="border-border border rounded-lg flex flex-col items-start divide-y">
          {searchResult?.project_member.map((member) => (
            <Button
              asChild
              variant={"link"}
              className="h-fit w-full justify-start p-4"
              key={member.user_id}
            >
              <Link href={`/${member.user_id}`}>
                <UserIcon
                  username={member.username}
                  src={member.profile_image}
                />
                <p className="text-lg">{member.username}</p>
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="py-8">
        <h4 className="font-semibold text-lg">メンバーを追加する</h4>
        <div className="relative flex gap-4 py-4">
          <Search
            size={20}
            className="stroke-muted-foreground absolute m-2.5"
          />
          <Input
            className="pl-10"
            placeholder="ユーザーを検索"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            onClick={handleSearchMember}
            className="bg-green-700 text-primary font-semibold hover:bg-green-800"
          >
            検索
          </Button>
        </div>

        {searchResult && searchResult.users.length > 0 ? (
          <div className="border-border border rounded-lg flex flex-col items-start divide-y">
            {searchResult.users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center w-full"
              >
                <div className="h-fit p-4 flex items-center gap-4">
                  <UserIcon username={user.username} src={user.user_image} />
                  <p className="text-lg">{user.username}</p>
                </div>
                {invitemember(user.id) ? (
                  <Button className="mx-4" size={"sm"} disabled>
                    招待済み
                  </Button>
                ) : (
                  <Button
                    className="mx-4"
                    size={"sm"}
                    onClick={() => handleAddMember(user.id)}
                  >
                    追加
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-center">
            ヒットしたユーザー0人
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMember;
