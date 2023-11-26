"use client";
import { Button } from "@/components/Button";
import InputBox from "@/components/InputBox";
import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import React, { useRef } from "react";

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

const SignupPage = () => {
  const register = async () => {
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
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("User Registered!");
    console.log({ response });
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
    <main className="m-2 overflow-hidden shadow flex flex-col items-center justify-center p-24">
      <div className="flex flex-col space-y-3 items-center justify-center">
        <p className="text-sm font-medium text-gray-300">Hey there,</p>
        <p className="text-lg sm:text-2xl font-semibold">Create an Account</p>
      </div>
      <div className="p-2 flex flex-col gap-6 mt-8">
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
        <InputBox
          name="password"
          labelText="Password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />

        <div className="flex justify-center items-center gap-2 mt-8">
          <Button onClick={() => register()}>Submit</Button>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
