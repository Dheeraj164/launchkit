import NavBar from "@/component/NavBar";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <NavBar />
      {children}
    </body>
  );
}
