import { z } from "zod";
import { useState } from "react";
import DropImageZone from "../DropImageZone";
import { ImageUp } from "lucide-react";

export const commitSchema = z.object({
  commit_message: z.string().min(1, "コミットメッセージは必須です").max(100),
  commit_image: z.custom<File>().refine((file) => file, {
    message: "画像ファイルの添付は必須です",
  }),
});

const AddCommitContent = ({
  setFormValue,
}: {
  setFormValue: (e: File) => void;
}) => {
  const [image, setImage] = useState<string | null>(null);

  const onDropFile = (file: File) => {
    if (file.type.substring(0, 5) !== "image") {
      alert("画像ファイルでないものはアップロードできません！");
    } else {
      setFormValue(file);
      const img = URL.createObjectURL(file);
      setImage(img);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files !== null && files.length > 0) {
      if (files.length === 1) {
        onDropFile(files[0]);
      } else {
        alert("ファイルは１個まで！");
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center max-h-[400px]">
      {image ? (
        <img
          src={image}
          alt="画像のプレビュー"
          className="bg-foreground rounded-md block max-h-[400px]"
        />
      ) : (
        <DropImageZone onDropFile={onDropFile}>
          <div className="flex flex-col items-center gap-3 text-center">
            <ImageUp size={32} className="opacity-70" />
            ここに画像をドラッグして追加するか
            <label
              htmlFor="image"
              className="cursor-pointer text-blue-400 hover:underline"
            >
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={onChange}
                className="hidden"
              />
              画像を選択してください
            </label>
          </div>
        </DropImageZone>
      )}
    </div>
  );
};

export default AddCommitContent;
