"use client";

import { Button } from "@/components/Button";
import CircularLoading from "@/components/CircularLoading";
import InputBox from "@/components/InputBox";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "@/lib/types/auth.types";
import { Backend_URL } from "@/lib/Constants";

const showToastMessage = (message: string) => {
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    console.log("🚀 ~ file: page.tsx:38 ~ onSubmit ~ data:", data);
    const res = await fetch(Backend_URL + "/auth/users/", {
      method: "POST",
      body: JSON.stringify(data),
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
    }
    reset();
  };

  return (
    <main className="min-h-screen shadow flex-col-center p-24">
      <div className="flex-col-center space-y-3">
        <p className="text-sm font-medium text-gray-300">Hey there,</p>
        <p className="text-lg sm:text-2xl font-semibold">Create an Account</p>
      </div>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-2 flex flex-col gap-3 mt-8 space-y-5"
      >
        <div className="flex space-x-3">
          <InputBox
            {...register("firstName")}
            name="fist_name"
            labelText="First name"
            type="text"
          />
          {errors.firstName && (
            <p className="text-red-500">{`${errors.firstName?.message}`}</p>
          )}
          <InputBox
            {...register("lastName")}
            name="last_name"
            labelText="Last name"
            type="text"
          />
          {errors.lastName && (
            <p className="text-red-500">{`${errors.lastName?.message}`}</p>
          )}
        </div>
        <div className="flex space-x-3">
          <InputBox
            {...register("phoneNumber")}
            autoComplete="off"
            name="phone_number"
            labelText="Phone number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{`${errors.phoneNumber?.message}`}</p>
          )}
          <InputBox {...register("email")} name="email" labelText="Email" />
        </div>
        {errors.email && (
          <p className="text-red-500">{`${errors.email?.message}`}</p>
        )}
        <InputBox
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password?.message}`}</p>
        )}
        <div className="flex-row-center pt-8">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-full disabled:bg-violet-100"
          >
            <div className="flex-row-center space-x-3">
              <p>Create an account </p>
              {isSubmitting && <CircularLoading size={20} />}
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
