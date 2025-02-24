"use client";

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [reCaptchaStatues, setReCaptchaStatues] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res.success) {
        toast.success(res?.message || "");
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/profile");
        }
      } else {
        toast.error(res?.message);
      }
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = async (value: string | null) => {
    console.log("Captcha value:", value);
    try {
      const res = await reCaptchaTokenVerification(value!);

      if (res?.success) {
        setReCaptchaStatues(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex flex-col items-center space-x-4 text-center ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">
            Welcome back !
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
              onChange={onChange}
            />
          </div>
          <Button
            disabled={reCaptchaStatues ? false : true}
            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
