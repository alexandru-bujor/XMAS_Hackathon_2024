'use client'
import type { Metadata } from "next";
import React,{ useState } from "react";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
// "@/components/module/Sidebar"

// export const metadata: Metadata = {
//   title: "Hackaton Faf",
//   description: "TEAM HACKATON FAF",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [sidebarOpen,setSidebarOpen] = useState<boolean>(true) 
  return (
    <html lang="en">
      <body className="bg-[#F5F5F5]">
        {/* <Sidebar sidebarOpen = {sidebarOpen} setSidebarOpen={setSidebarOpen}/> */}
        {children}
      </body>
    </html>
  );
}
