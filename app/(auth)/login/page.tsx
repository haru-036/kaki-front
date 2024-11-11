import AuthForm from "@/components/AuthForm";

const Login = () => {
  return (
    <div className="container mx-auto py-10 px-8 max-w-md">
      <h2 className="text-2xl font-semibold text-center pb-8">ログイン</h2>
      <AuthForm type="login" />
    </div>
  );
};

export default Login;
