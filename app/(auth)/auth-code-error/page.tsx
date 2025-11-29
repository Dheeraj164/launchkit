"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthFailed() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 5000);
  }, [router]);

  return (
    <div className="bg-black flex justify-center items-center h-screen">
      <h1 className="text-6xl text-white typewriter">
        Authorization failed.......
      </h1>
    </div>
  );
}
