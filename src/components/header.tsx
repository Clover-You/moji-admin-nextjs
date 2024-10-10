"use client"

import React from "react"

import { cn } from "@/lib/utils"

import { NavigationMenuLink } from "@/components/ui"
import { HeaderAvatar } from "./header-avatar"
import { useAppSelector } from "@/hook/redux"
import { ModeToggle } from "./mode-toggle"

export function Header() {

  const userData = useAppSelector(state => state.user.data)

  return <>
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95
        backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div></div>

        <div className="flex gap-4">
          <ModeToggle />
          <HeaderAvatar username={userData?.username ?? "Username"} avatar={userData?.avatar}
            email={userData?.email} />
        </div>
      </div>
    </header>
  </>
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-eone
             transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent
             focus:text-accent-foreground`,
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem"
