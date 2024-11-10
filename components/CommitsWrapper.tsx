import { GitCommit } from "lucide-react";

const CommitsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <div className="text-muted-foreground flex items-center gap-2 text-sm py-1">
        <GitCommit className="m-1" />
        Commits on Nov 7, 2024
      </div>
      <div className="ml-4 border-l box-content border-input py-2 pl-5">
        <div className="border border-border rounded-lg divide-y">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommitsWrapper;
