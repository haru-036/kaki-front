import { GitCommit } from "lucide-react";

const CommitsWrapper = ({
  date,
  children,
}: {
  date: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="">
      <div className="text-muted-foreground flex items-center gap-2 text-sm py-1">
        <GitCommit className="m-1" />
        Commits on {date}
      </div>
      <div className="md:ml-4 md:border-l md:box-content md:border-input py-2 md:pl-5">
        <div className="border border-border rounded-lg divide-y">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommitsWrapper;
