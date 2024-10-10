"use client"

import React from "react"
import { Provider as ReduxProvider } from "react-redux"

import { MockProvider } from "./mock-provider"
import { store } from "../store"
import { ThemeProvider } from "@/components/theme-provider"

export function Provider({ children }: React.PropsWithChildren) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <MockProvider>{children}</MockProvider>
      </ThemeProvider>
    </ReduxProvider>
  )
}
