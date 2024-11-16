"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import AddCommitContent, { commitSchema } from "./commit/AddCommitContent";
import axios from "axios";
import { getToken } from "@/lib/token";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";

const projectSchema = z.object({
  project_name: z
    .string()
    .min(1, "プロジェクト名は必須です")
    .max(50, "プロジェクト名は50文字以内で記述してください"),
  project_description: z.string().min(1, "概要は必須です").max(200),
});

export const formSchema = projectSchema.merge(commitSchema);

const CreateProjectForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project_name: "",
      project_description: "",
      commit_message: "",
      commit_image: undefined,
    },
  });

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
  }, [user, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const formData = new FormData();
    formData.append("project_name", values.project_name);
    formData.append("project_description", values.project_description);
    formData.append("tags", "");
    formData.append("commit_image", values.commit_image);
    formData.append("commit_message", values.commit_message);

    try {
      const token = getToken();
      if (!token) return;
      const response = await api.post("/makeproject", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("POSTリクエストが成功しました", response.data);
      router.push(`/${userId}/${response.data.project_id}`);
    } catch (error) {
      console.error("POSTリクエストが失敗しました", error);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error("不明なエラー");
      }
    }
  }

  if (!user) return null;

  return (
    <div className="py-8 tracking-wide">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="project_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>プロジェクト名</FormLabel>
                <FormControl>
                  <Input placeholder="project" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="project_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>概要</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="プロジェクトについて"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <h3 className="text-lg font-semibold py-2">初回コミット</h3>
            <FormField
              control={form.control}
              name="commit_image"
              render={() => (
                <FormItem>
                  <AddCommitContent
                    setFormValue={(img) => form.setValue("commit_image", img)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="commit_message"
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

          <Button
            type="submit"
            className="bg-green-700 text-primary font-semibold hover:bg-green-800"
          >
            作成
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
