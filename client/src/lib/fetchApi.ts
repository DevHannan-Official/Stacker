import z from "zod";
import { signupSchema } from "./schemas";
import toast from "react-hot-toast";
import { api } from "./axios";

export const signUpUser = async (data: z.infer<typeof signupSchema>) => {
  const reqBody = {
    name: data.name,
    email: data.email,
    password: data.password,
  };

  const res = await api("/api/auth/register", {
    method: "POST",
    data: reqBody,
  });

  if (res.status !== 201) {
    toast.error("An Error Occured, Please Try Again");
    throw new Error(res.data?.error);
  }

  return res.data;
};
