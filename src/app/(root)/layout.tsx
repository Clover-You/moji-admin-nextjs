'use client'
import { Header, Nav, NavItemProps } from '@/components'
import React from 'react'

const items = [
  {
    title: 'Dashboard', variant: 'default', label: '9', icon: <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2 h-4 w-4"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>,
  },
] satisfies NavItemProps[]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <div className="grid lg:grid-cols-5">
        <Nav items={items} />
        {children}
      </div>
    </div>
  </>
}
