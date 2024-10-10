'use client'
import React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui'
import { Optional } from '@/components/utils'

import * as strings from '@/utils/strings'

interface DialogProps {
  open?: boolean
  title?: string
  okText?: React.ReactNode
  onOK?: () => void
  onCancel?: () => void
  cancelText?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

interface OptionsRaw extends DialogProps { }

type Options = Omit<OptionsRaw, 'open' | 'onOpenChange' | 'onOk' | 'onCancel'>

export function useAlertDialog(props?: Options) {
  const [open, setOpenState] = React.useState(false)
  const [options, setOptions] = React.useState(props)

  const resolveCache = React.useRef<(state: boolean) => void>()

  function show(ops?: Options) {
    setOptions({ ...props, ...ops })
    setOpenState(true)

    if (resolveCache.current) return Promise.resolve(false)

    return new Promise<boolean>(resolve => {
      resolveCache.current = resolve
    })
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
    // eslint-disable-next-line react-compiler/react-compiler
    dialog({
      open,
      title: options?.title,
      children: options?.children,
      onOpenChange,
      onOK: okHandle,
      onCancel: cancelHandle,
    }),
    {
      show,
    },
  ]
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
