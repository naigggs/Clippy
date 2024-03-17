"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginForm = dynamic(() => import("./form"), { ssr: false });

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    async function checkAuth() {
      const session = await getSession();
      if (session) {
        router.push("/chat");
      }
    }
    checkAuth();
  }, []);
  return (
    <div>
      <LoginForm />
    </div>
  );
}
