"use client";
import CommitCard from "@/components/commit/CommitCard";
import CommitsWrapper from "@/components/commit/CommitsWrapper";
import api from "@/lib/axios";
import { getToken } from "@/lib/token";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export type Commit = {
  id: number;
  commit_message: string;
  commit_image: string;
  created_at: Date;
  created_user_id: number;
  created_username: string;
  created_user_profile_image: string;
};

const groupByDate = (data: Commit[]): Record<string, Commit[]> => {
  return data.reduce((acc: Record<string, Commit[]>, item: Commit) => {
    const dateKey = new Date(item.created_at).toISOString().split("T")[0]; // 日付部分（YYYY-MM-DD）をキーとして使用
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {});
};

const Commits = () => {
  const params = useParams();
  // const [commits, setCommits] = useState<Commit[] | null>(null);
  const [groupedData, setGroupedData] = useState<Record<string, Commit[]>>({}); // グループ化されたデータの状態

  useEffect(() => {
    (async () => {
      try {
        const token = getToken();
        const res = await api.get(
          `/project/${params.projectId}/commits`,
          token
            ? {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            : {}
        );
        const data = res.data;
        // setCommits(data.commits);
        const grouped = groupByDate(data.commits);
        setGroupedData(grouped);
        console.log(data, grouped);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [params]);

  return (
    <div className="container mx-auto py-10 px-6 md:px-8 max-w-screen-xl">
      <h2 className="text-2xl font-semibold pb-4">Commits</h2>
      {/* 日付別にまとめてmap、その中でさらにcommitごとにmap */}
      {Object.keys(groupedData).length > 0 ? (
        Object.keys(groupedData).map((date) => (
          <CommitsWrapper key={date} date={date}>
            {groupedData[date].map((item) => (
              <CommitCard
                key={item.id}
                commit={item}
                userId={String(params.username)}
                projectId={String(params.projectId)}
              />
            ))}
          </CommitsWrapper>
        ))
      ) : (
        <p>データを読み込み中...</p>
      )}
      {/* 余力があればここにpaginationを追加 */}
    </div>
  );
};

export default Commits;
