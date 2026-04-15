import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-screen h-screen flex justify-center items-center">
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default LoginPage;
