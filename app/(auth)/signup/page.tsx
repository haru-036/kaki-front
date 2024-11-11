import AuthForm from "@/components/AuthForm";

const Signup = () => {
  return (
    <div className="container mx-auto py-10 px-8 max-w-md">
      <h2 className="text-2xl font-semibold text-center pb-8">新規登録</h2>
      <AuthForm type="signup" />
    </div>
  );
};

export default Signup;
