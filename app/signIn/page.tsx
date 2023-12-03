"use client";

import { Button } from "@/components/Button";
import CircularLoading from "@/components/CircularLoading";
import InputBox from "@/components/InputBox";
import { Backend_URL, Frontend_URL } from "@/lib/Constants";
import { SignInResponse, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormInputs = {
  username: string;
  password: string;
};

const showToastMessage = (message: string) => {
  console.log("toasting ");
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

const SigninPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    const initialVisitValue = !!sessionStorage.getItem("isInitialVisit");

    e.preventDefault();
    setLoading(true);
    const { ok, error } = (await signIn("credentials", {
      username: data.current.username,
      password: data.current.password,
      redirect: false,
    })) as SignInResponse;
    if (ok) {
      router.replace(Frontend_URL);
    } else {
      showToastMessage(
        "No active accounts were found for the given credentials."
      );
      setLoading(false);
    }

    // if (!res.ok) {
    //   alert(res.statusText);
    //   return;
    // }
    // const response = await res.json();
    // alert("User Authenticated!");
    // console.log({ response });
  };

  const data = useRef<FormInputs>({
    username: "",
    password: "",
  });

  return (
    <main className="min-h-screen flex-col-center p-24">
      <div className="flex-col-center space-y-3">
        <p className="text-sm font-medium text-gray-300">Welcome back,</p>
        <p className="text-xl sm:text-2xl font-semibold">
          Let&apos;s get started.
        </p>
      </div>
      <ToastContainer />
      <form onSubmit={login} className="p-2 flex flex-col gap-3 mt-8 space-y-5">
        <InputBox
          name="username"
          labelText="Email or phone number"
          type="text"
          required
          onChange={(e) => (data.current.username = e.target.value)}
        />
        <InputBox
          name="password"
          labelText="Password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />

        <div className="pt-8">
          <Button type="submit" className="h-11 w-full rounded-full">
            <div className="relative flex items-center justify-between space-x-3">
              <div></div>
              <p className="absolute inset-0 flex items-center justify-center">
                Log me in{" "}
              </p>
              {loading ? <CircularLoading size={20} /> : <div></div>}
              {/* <CircularLoading size={20} /> */}
            </div>
          </Button>
        </div>
        <div className="flex ">
          <p>
            Don&apos;t have an account?{" "}
            <Link href={"/signup"} className="text-violet-500">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default SigninPage;
