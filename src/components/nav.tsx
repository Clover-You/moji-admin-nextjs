import React from "react"
import Link from 'next/link'

import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui"

export interface NavItemProps {
  title: string
  icon?: React.ReactNode
  label?: string
  variant: "default" | "ghost"
}

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: NavItemProps[]
}

export function Nav(props: NavProps) {
  return (
    <nav className={cn("pn-12", props.className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {props.items?.map((item) => (
              <Link draggable={false} href="#" className={cn(
                buttonVariants({ size: 'sm', variant: 'ghost' }),
                'w-full justify-start'
              )}>
                {item.icon}
                {item.title}
                {item.label && (
                  <span
                    className={cn(
                      'ml-auto',
                      // item.id === active?.id &&
                      // 'text-background dark:text-white',
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
