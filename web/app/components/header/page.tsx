"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [state, setState] = useState(false);
  const { data: session } = useSession();

  // Replace # paths with your paths
  const navigation = [
    { title: "Chat Now!", path: "#" },
    { title: "Features", path: "/features" },
    { title: "Tutorial", path: "/tutorial" },
    { title: "FAQ", path: "/faq" },
  ];

  return (
    <nav className="bg-[#EDEDED] border-b w-full md:static md:text-sm md:border-none">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <img src="logo.png" width={120} height={50} alt="Clippy.AI Logo" />
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-gray hover:text-gray-500">
                  <Link href={item.path} className="block">
                    {item.title}
                  </Link>
                </li>
              );
            })}
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              {session ? (
                <li>
                  <Link
                    href="/api/auth/signout"
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                    className="block py-3 px-4 font-medium text-center text-[#EDEDED] bg-[#171717] hover:bg-[#171717e8] active:bg-[#171717] active:shadow-none rounded-lg shadow md:inline"
                  >
                    Log out
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="block py-3 text-center text-gray hover:text-gray-500 border rounded-lg md:border-none"
                    >
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="block py-3 px-4 font-medium text-center text-[#EDEDED] bg-[#171717] hover:bg-[#171717e8] active:bg-[#171717] active:shadow-none rounded-lg shadow md:inline"
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
