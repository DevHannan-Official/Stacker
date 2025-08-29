"use client";

import Button from "@/components/shared/button";
import { sendVerificationMail, verifyUser } from "@/lib/fetchApi";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react"; // Import useState
import { useAuthStore } from "@/stores/useAuthStore";
import { otpSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SendVerificationPage = () => {
  const { user, setUser, isFetching } = useAuthStore();
  const router = useRouter();

  const [resendTimer, setResendTimer] = useState(0); // State for the timer
  const [canResend, setCanResend] = useState(false); // State to control resend button

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  });

  const { mutate: sendVerification, isPending: isMailSending } = useMutation({
    mutationFn: sendVerificationMail,
    onSuccess: () => {
      toast.success("Verification mail sent successfully.");
      setResendTimer(60); // Start the timer
      setCanResend(false); // Disable the button
      reset();
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.error || "An error occurred. Please try again."
      );
    },
  });

  const { mutate: verifyTheUser, isPending: isVerifyingUser } = useMutation({
    mutationFn: verifyUser,
    onSuccess: (res) => {
      setUser(res.data.user);
      router.replace("/web");
    },
    onError: (err: any) => {
      toast.error(
        err?.response.data.error || "An error occurred. Please try again."
      );
    },
  });

  // Initial call to send verification mail on component mount
  useEffect(() => {
    if (isFetching || !user || user.verified) return;
    sendVerification();
  }, [sendVerification, isFetching, user]);

  // Timer logic
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (resendTimer > 0) {
      timerId = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true); // Enable resend button after timer ends
    }
    return () => clearTimeout(timerId); // Cleanup the timer
  }, [resendTimer]);

  const handleResendClick = () => {
    if (!isMailSending) {
      sendVerification();
    }
  };

  function onSubmit(values: z.infer<typeof otpSchema>) {
    if (isFetching || !user || user.verified) return;
    verifyTheUser(values);
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
          <h1 className="text-2xl sm:text-3xl font-bold">Verify your email</h1>
          <p className="text-sm text-text-secondary font-medium">
            Verify your email to continue to Stacker
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="emailOrUsername">Account: {user?.displayName}</label>

          <p className="my-1 text-xs font-medium">
            Mail will be sent to your email <strong>{user?.email}</strong>
            <Button
              variant={"secondary"}
              size={"icon"}
              onClick={handleResendClick}
              disabled={isMailSending || !canResend || isVerifyingUser}
            >
              {isMailSending
                ? "Sending..."
                : canResend
                ? "Resend"
                : `Resend in ${resendTimer}s`}
            </Button>
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="otp" className={errors.code?.message ? "danger" : ""}>
            OTP
          </label>
          <input
            type="number"
            placeholder="******"
            id="otp"
            className={`input ${errors.code?.message ? "danger" : ""} `}
            {...register("code")}
          />
          <p className="text-red-500 my-1 text-xs font-medium">
            {errors.code?.message}
          </p>
        </div>

        <Button
          variant={"primary"}
          additionalClasses="w-full"
          type="submit"
          disabled={isMailSending || isVerifyingUser}
        >
          {isVerifyingUser ? "Verifying..." : "Verify"}
        </Button>

        <div className="w-full my-1 relative max-w-md">
          <hr className="divider" />
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

export default SendVerificationPage;
