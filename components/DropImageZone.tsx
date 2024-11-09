import { ImageUp } from "lucide-react";
import { useState } from "react";

type Props = {
  onDropFile: (file: File) => void;
  children: React.ReactNode;
};

const DropImageZone = ({ onDropFile, children }: Props) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files !== null && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files.length === 1) {
        onDropFile(e.dataTransfer.files[0]);
      } else {
        alert("ファイルは１個まで！");
      }
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className={`${
        isDragActive
          ? "border-4 border-input border-dashed rounded-md bg-muted"
          : null
      } w-full h-72 flex items-center justify-center border border-input rounded-md`}
    >
      {isDragActive ? (
        <div className="flex flex-col items-center gap-4">
          <ImageUp size={32} className="opacity-70" />
          ドロップして画像をアップロード
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default DropImageZone;
