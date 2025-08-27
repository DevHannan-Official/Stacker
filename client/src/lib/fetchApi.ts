import z from "zod";
import { signinSchema, signupSchema } from "./schemas";
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

  return res;
};

export const signInUser = async (data: z.infer<typeof signinSchema>) => {
  let reqBody;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(data.emailOrUsername)) {
    reqBody = {
      email: data.emailOrUsername,
      password: data.password,
    };
  } else {
    reqBody = {
      username: data.emailOrUsername,
      password: data.password,
    };
  }

  const res = await api("/api/auth/login", {
    method: "POST",
    data: reqBody,
  });

  return res;
};

export const checkAuth = async () => {
  const res = await api("/api/auth/authorize", {
    method: "GET",
  });

  return res;
};
