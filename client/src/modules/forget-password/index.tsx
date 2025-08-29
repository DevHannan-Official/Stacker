"use client";

import Button from "@/components/shared/button";
import { forgetPassword } from "@/lib/fetchApi";
import { forgetPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const ForgetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: forgetPasswordFunc, isPending } = useMutation({
    mutationFn: forgetPassword,
    onSuccess: (res) => {
      reset();
      toast.success(res?.data.message);
    },
    onError: (err: any) => {
      toast.error(
        err?.response.data.error || "An error occurred. Please try again."
      );
    },
  });

  function onSubmit(values: z.infer<typeof forgetPasswordSchema>) {
    forgetPasswordFunc(values);
  }

  return (
    <div className="flex-1 w-full min-h-svh px-4 py-4 flex flex-col items-center justify-center bg-slack-purple">
      <form
        className="flex flex-col gap-4 items-center w-full p-4 md:p-6 shadow max-w-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Image
          src={"/images/logo.png"}
          alt="Stacker"
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20"
        />
        <div className="text-center mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold">Forgot Password?</h1>
          <p className="text-sm text-text-secondary font-medium">
            Enter the correct email to reset your password
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="email"
            className={errors.email?.message ? "danger" : ""}
          >
            Email
          </label>
          <input
            type="text"
            placeholder="user@example.com"
            id="email"
            className={`input ${errors.email?.message ? "danger" : ""}`}
            {...register("email")}
          />
          <p className="text-red-500 my-1 text-xs font-medium">
            {errors.email?.message}
          </p>
        </div>
        <Button
          variant={"primary"}
          additionalClasses="w-full"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Sending ..." : "Send Link"}
        </Button>

        <div className="w-full my-1 relative max-w-md">
          <hr className="divider" />
        </div>
        <div className="flex items-center gap-1.5">
          <p className="text-sm text-text-primary">
            Don&apos;t have an account?
          </p>
          <Link className="link" href="/sign-up">
            Sign Up
          </Link>
        </div>
        <p className="mt-2 text-xs text-text-secondary text-center max-w-md">
          By continuing, you agree to our{" "}
          <Link className="link" href="#">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="link" href="#">
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgetPasswordPage;
