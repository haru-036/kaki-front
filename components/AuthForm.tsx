"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

// 共通のベーススキーマ
const baseSchema = z.object({
  username: z
    .string()
    .min(2, "2文字以上入力してください")
    .max(20, "20文字以下で入力してください"),
  password: z
    .string()
    .min(8, "8文字以上入力してください")
    .max(20, "20文字以下で入力してください"),
});

// 新規登録用スキーマ（confirmPasswordを含む）
const signupSchema = baseSchema
  .extend({
    confirmPassword: z.string().min(8, "8文字以上で入力してください"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"], // confirmPasswordフィールドにエラーを表示
  });

const AuthForm = ({ type }: { type: "login" | "signup" }) => {
  const [showPassword, setShowPassword] = useState(false);

  // typeに応じてスキーマを選択
  const schema = type === "signup" ? signupSchema : baseSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ユーザー名</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      variant={"ghost"}
                      size={"icon"}
                      className="absolute right-0 top-0"
                    >
                      {showPassword ? <Eye /> : <EyeClosed />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {type === "signup" && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>確認用パスワード</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full">
            {type === "login" ? "ログイン" : "新規登録"}
          </Button>
        </form>
      </Form>

      <Button
        variant={"link"}
        asChild
        className="text-center w-full text-muted-foreground my-6"
      >
        <Link href={type === "login" ? `/signup` : `/login`}>
          {type === "login"
            ? "アカウントがない方はこちら"
            : "アカウントをお持ちの方はこちら"}
        </Link>
      </Button>
    </div>
  );
};

export default AuthForm;
