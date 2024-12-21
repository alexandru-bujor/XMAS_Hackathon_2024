'use client'
import type { Metadata } from "next";
import React,{ useState } from "react";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/module/Sidebar";
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
      <body>
        <Sidebar sidebarOpen = {sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        {children}
      </body>
    </html>
  );
}
