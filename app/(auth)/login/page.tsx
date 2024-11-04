import FormLogin from "@/components/login/FormLogin";
import { Metadata } from "next";
import React, { FC } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Welcome to login page!",
};

const page: FC = () => {
  return <FormLogin />;
};

export default page;
