"use client";
import { AuthContext } from "@/components/AuthProvider";
import CommentCard from "@/components/CommentCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/axios";
import { getToken } from "@/lib/token";
import { Comment } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type CommitDetailData = {
  comments: Comment[];
  commit_id: number;
  commit_image: string;
  commit_message: string;
  created_at: Date;
  created_user: number;
  project_id: number;
  project_name: string;
};

const CommitDetail = () => {
  const params = useParams();
  const [commitDetail, setCommitDetail] = useState<CommitDetailData>();
  const [inputValue, setInputValue] = useState("");
  const [refreshKey, setRefreshKey] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (refreshKey) {
        try {
          const token = getToken();
          const res = await api.get(
            `/project/${params.projectId}/commit/${params.commitId}`,
            token
              ? {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              : {}
          );
          const data = res.data;
          setCommitDetail(data);
          console.log(data);
          setRefreshKey(false);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [refreshKey]);

  const handleComment = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const res = await api.post(
        `/project/${params.projectId}/commit/${params.commitId}`,
        { content: inputValue },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = res.data;
      console.log(data);
      setInputValue("");
      setRefreshKey(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-lg">
      <Link href={`/${params.username}/${params.projectId}`}>
        <h3 className="pb-2 text-blue-400 hover:underline tracking-wide">
          {params.projectId} /
        </h3>
      </Link>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold pb-2">
            {commitDetail?.commit_message}
          </h2>
          <div className="flex gap-2 items-center">
            <Link
              href={`/${params.username}`}
              className="flex gap-2 items-center"
            >
              <Avatar className="w-5 h-5">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground hover:underline">
                {commitDetail?.created_user}
              </p>
            </Link>
            <div className="text-xs text-muted-foreground">
              December 7, 2021
            </div>
          </div>
        </div>
        <p className="text-muted-foreground block">{commitDetail?.commit_id}</p>
      </div>
      <div className="py-6">
        <img
          src={`data:image/png;base64,${commitDetail?.commit_image}`}
          alt="コミット画像"
          className="mx-auto block h-full rounded max-h-[480px] object-contain"
        />
      </div>

      <div className="pt-6 pb-8 space-y-4">
        {commitDetail?.comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>

      {user && (
        <div className="flex gap-4 items-start border-t-2 border-border pt-4 pb-36">
          <Avatar className="">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid w-full gap-2">
            <Label htmlFor="comment" className="text-base font-semibold">
              コメント
            </Label>
            <Textarea
              placeholder="Type your message here."
              id="comment"
              className="resize-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={handleComment}
              className="bg-green-700 text-primary font-semibold hover:bg-green-800 w-fit my-2 ml-auto mr-0"
            >
              コメント
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommitDetail;
