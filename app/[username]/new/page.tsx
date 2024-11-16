import CreateProjectForm from "@/components/CreateProjectForm";

const NewProject = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const userId = (await params).username;
  return (
    <div className="container mx-auto py-10 px-8 max-w-screen-md">
      <h2 className="text-2xl font-semibold">新規プロジェクトを作成</h2>
      <CreateProjectForm userId={userId} />
    </div>
  );
};

export default NewProject;
