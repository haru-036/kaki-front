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
import AddCommitContent, { commitSchema } from "./AddCommitContent";

const projectSchema = z.object({
  projectName: z
    .string()
    .min(1, "プロジェクト名は必須です")
    .max(50, "プロジェクト名は50文字以内で記述してください"),
  description: z.string().max(200),
});

export const formSchema = projectSchema.merge(commitSchema);

const CreateProjectForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
      commitMessage: "",
      commitImage: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="py-8 tracking-wide">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="projectName"
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
            name="description"
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
              name="commitImage"
              render={() => (
                <FormItem>
                  <AddCommitContent
                    setFormValue={(img) => form.setValue("commitImage", img)}
                  />
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
