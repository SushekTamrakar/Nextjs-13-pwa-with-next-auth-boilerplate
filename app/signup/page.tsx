"use client";

import { Button } from "@/components/Button";
import CircularLoading from "@/components/CircularLoading";
import InputBox from "@/components/InputBox";
import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

type FormInputs = {
  phone_number: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile: {
    district: number;
    province: number;
  };
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

const SignupPage = () => {
  const [loading, setLoading] = useState(false);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(Backend_URL + "/auth/users/", {
      method: "POST",
      body: JSON.stringify({
        phone_number: data.current.phone_number,
        email: data.current.email,
        password: data.current.password,
        first_name: data.current.first_name,
        last_name: data.current.last_name,
        profile: {
          district: data.current.profile.district,
          province: data.current.profile.province,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const error = await res.json();
      Object.entries(error.data).forEach(([key, message]) => {
        if (Array.isArray(message)) {
          message.forEach((msg) => {
            showToastMessage(msg);
          });
        } else {
          showToastMessage(message as string);
        }
      });
      setLoading(false);
    }
  };

  const data = useRef<FormInputs>({
    phone_number: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    profile: {
      district: 1,
      province: 1,
    },
  });

  return (
    <main className="min-h-screen shadow flex-col-center p-24">
      <div className="flex-col-center space-y-3">
        <p className="text-sm font-medium text-gray-300">Hey there,</p>
        <p className="text-lg sm:text-2xl font-semibold">Create an Account</p>
      </div>
      <ToastContainer />
      <form
        onSubmit={register}
        className="p-2 flex flex-col gap-3 mt-8 space-y-5"
      >
        <div className="flex space-x-3">
          <InputBox
            name="fist_name"
            labelText="Fist name"
            type="text"
            required
            onChange={(e) => (data.current.first_name = e.target.value)}
          />
          <InputBox
            name="last_name"
            labelText="Last name"
            type="text"
            required
            onChange={(e) => (data.current.last_name = e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
          <InputBox
            autoComplete="off"
            name="phone_number"
            labelText="Phone number"
            required
            onChange={(e) => (data.current.phone_number = e.target.value)}
          />
          <InputBox
            name="email"
            labelText="Email"
            required
            onChange={(e) => (data.current.email = e.target.value)}
          />
        </div>
        <InputBox
          name="password"
          labelText="Password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />

        <div className="flex-row-center pt-8">
          <Button
            type="submit"
            className="w-full rounded-full"
            disabled={loading}
          >
            <div className="flex-row-center space-x-3">
              <p>Create an account </p>
              {loading && <CircularLoading size={20} />}
            </div>
          </Button>
        </div>
        <div>
          <p>
            Already have an account?{" "}
            <Link href={"/signIn"} className="text-violet-500">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default SignupPage;
