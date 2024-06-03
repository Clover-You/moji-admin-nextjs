"use client"
import { Header, Nav } from "@/components"
import React from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <div className="grid lg:grid-cols-5">
        <Nav />
        {children}
      </div>
    </div>
  </>
}
