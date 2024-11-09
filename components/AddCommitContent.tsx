import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { formSchema } from "./CreateProjectForm";
import { UseFormReturn } from "react-hook-form";
import { Input } from "./ui/input";
import { useState } from "react";
import DropImageZone from "./DropImageZone";
import { ImageUp } from "lucide-react";

export const commitSchema = z.object({
  commitMessage: z.string().min(1, "コミットメッセージは必須です").max(100),
  commitImage: z.string().min(1, "画像は必須です"),
});

const AddCommitContent = ({
  form,
  init,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  init: boolean;
}) => {
  const [image, setImage] = useState<string | null>(null);

  const onDropFile = (file: File) => {
    if (file.type.substring(0, 5) !== "image") {
      alert("画像ファイルでないものはアップロードできません！");
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const imageSrc: string = fileReader.result as string;
        setImage(imageSrc);
        form.setValue("commitImage", imageSrc);
      };
      fileReader.readAsDataURL(file);
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
    <div>
      <h3 className="text-lg font-semibold py-2">
        {init ? "初回コミット" : "コミット"}
      </h3>

      <FormField
        control={form.control}
        name="commitImage"
        render={() => (
          <FormItem>
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
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="commitMessage"
        render={({ field }) => (
          <FormItem className="pt-6">
            <FormLabel>コミットメッセージ</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AddCommitContent;
