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

const AddCommitForm = () => {
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

  function onSubmit(values: z.infer<typeof commitSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
