import CommitCard from "@/components/CommitCard";
import CommitsWrapper from "@/components/CommitsWrapper";

const Commits = () => {
  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-xl">
      <h2 className="text-2xl font-semibold pb-4">Commits</h2>
      {/* 日付別にまとめてmap、その中でさらにcommitごとにmap */}
      <CommitsWrapper>
        <CommitCard />
        <CommitCard />
      </CommitsWrapper>
      <CommitsWrapper>
        <CommitCard />
      </CommitsWrapper>
      {/* 余力があればここにpaginationを追加 */}
    </div>
  );
};

export default Commits;