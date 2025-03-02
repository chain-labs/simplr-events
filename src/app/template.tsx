"use client";

import SimpleBar from "simplebar-react";

import Header from "@/components/Header";

import { UserProvider } from "../../UserContext";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SimpleBar style={{ maxHeight: "100vh", maxWidth: "100vw" }}>
      <div className="flex h-full min-h-[100vh] w-full max-w-[100vw] flex-col overflow-x-hidden">
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
      </div>
    </SimpleBar>
  );
}
