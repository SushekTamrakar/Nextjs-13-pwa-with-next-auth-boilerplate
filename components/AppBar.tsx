"use client";

import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { topTabBarBlackListedRoutes } from "@/lib/Constants";
import { usePathname } from "next/navigation";

const AppBar = () => {
  const pathName = usePathname();
  if (topTabBarBlackListedRoutes.includes(pathName.toString())) return null;
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b bg-black shadow">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        Home Page
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/dashboard"}
      >
        DashBoard
      </Link>

      <SignInButton />
    </header>
  );
};

export default AppBar;
