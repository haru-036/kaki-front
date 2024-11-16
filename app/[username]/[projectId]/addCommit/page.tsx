import AddCommitForm from "@/components/commit/AddCommitForm";
import Link from "next/link";

const AddCommit = async ({
  params,
}: {
  params: Promise<{ username: string; projectId: string }>;
}) => {
  const projectId = (await params).projectId;
  const userName = (await params).username;

  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-md">
      <h2 className="font-semibold text-2xl">コミット</h2>
      <Link href={`/${userName}/${projectId}`}>
        <h3 className="pt-2 text-blue-400 hover:underline tracking-wide">
          {projectId} /
        </h3>
      </Link>
      <AddCommitForm userId={userName} projectId={projectId} />
    </div>
  );
};

export default AddCommit;
