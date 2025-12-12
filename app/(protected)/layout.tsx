"use client";

import { AppCtx } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NavBar from "@/component/NavBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  // const { user } = AppCtx();
  // useEffect(() => {
  //   console.log(user);
  //   if (user) {
  //   }
  // }, [router, user]);
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
