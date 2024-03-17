'use client'
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const RegisterForm = dynamic(() => import("./form"), { ssr: false });

export default function RegisterPage() {
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
    <div className="">
      <RegisterForm />
    </div>
  );
}
