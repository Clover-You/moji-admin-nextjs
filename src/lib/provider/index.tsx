"use client"

import React from "react"
import { Provider as ReduxProvider } from "react-redux"

import { MockProvider } from "./mock-provider"
import { store } from "../store"

export function Provider({ children }: React.PropsWithChildren) {
  return (
    <ReduxProvider store={store}>
      <MockProvider>{children}</MockProvider>
    </ReduxProvider>
  )
}
