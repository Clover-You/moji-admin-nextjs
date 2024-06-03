"use client"
import React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui"
import { Optional } from "@/components/utils"

import * as strings from "@/utils/strings"

interface DialogProps extends React.PropsWithChildren {
  open?: boolean
  title?: string
  okText?: React.ReactNode
  onOK?: () => void
  onCancel?: () => void
  cancelText?: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

interface OptionsRaw extends DialogProps { }

type Options = Omit<OptionsRaw, "open" | "onOpenChange" | "onOk" | "onCancel">

export function useAlertDialog(options?: Options) {
  const [open, setOpenState] = React.useState(false)

  const resolveCache = React.useRef<(state: boolean) => void>()

  function useAPI() {
    function show() {
      setOpenState(true)

      if (resolveCache.current) return Promise.resolve(false)

      return new Promise<boolean>(resolve => {
        resolveCache.current = resolve
      })
    }

    return { show }
  }

  function onOpenChange(open: boolean) {
    setOpenState(open)
  }

  function okHandle() {
    consume(true)
  }

  function cancelHandle() {
    consume(false)
  }

  function consume(val: boolean) {
    if (!resolveCache.current) return
    resolveCache.current(val)
    resolveCache.current = undefined
  }

  return [
    dialog({
      open,
      title: options?.title,
      children: options?.children,
      onOpenChange,
      onOK: okHandle,
      onCancel: cancelHandle,
    }),
    useAPI(),
  ] as [React.ReactNode, ReturnType<typeof useAPI>]
}

function dialog(props: DialogProps) {
  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Optional if={strings.has(props.title)} />
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props.onCancel}>
            <Optional if={props.cancelText != void 0} ifCase={props.cancelText} else="Cancel" />
          </AlertDialogCancel>
          <AlertDialogAction onClick={props.onOK}>
            <Optional if={props.okText != void 0} ifCase={props.okText} else="Continue" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
