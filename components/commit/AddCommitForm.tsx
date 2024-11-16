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
import AddCommitContent, { commitSchema } from "./AddCommitContent";
import { Input } from "../ui/input";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/token";
import api from "@/lib/axios";
import axios from "axios";

const AddCommitForm = ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const form = useForm<z.infer<typeof commitSchema>>({
    resolver: zodResolver(commitSchema),
    defaultValues: {
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

  async function onSubmit(values: z.infer<typeof commitSchema>) {
    console.log(values);
    const formData = new FormData();
    formData.append("commit_image", values.commit_image);
    formData.append("commit_message", values.commit_message);

    try {
      const token = getToken();
      if (!token) return;
      const response = await api.post(
        `/project/${projectId}/commit`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("POSTリクエストが成功しました", response.data);
      router.push(`/${userId}/${projectId}/`);
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

          <Button
            type="submit"
            className="bg-green-700 text-primary font-semibold hover:bg-green-800"
          >
            コミット
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddCommitForm;
