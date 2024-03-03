"use client";

import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setIsLoading(false);
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        router.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4 bg-[#EDEDED]">
      <div className="max-w-sm w-full text-gray">
        <div className="text-center">
          <div className="mt-[-100px] space-y-2">
            <h3 className="text-[#171717] text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don't have an account?{" "}
              <Link
                href="#"
                className="font-medium underline text-gray hover:text-gray-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            />
          </div>
          <button className="w-full px-4 py-2 font-medium text-[#EDEDED] bg-[#171717] hover:bg-[#171717e8] active:bg-[#171717] rounded-lg duration-150">
          {isLoading ? "Signing in..." : "Sign in"}
          </button>
          <div className="text-center">
            <Link href="#" className="text-gray hover:text-gray-500">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
