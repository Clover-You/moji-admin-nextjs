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

interface DialogOptions {
  title?: string;
  description?: string;
  onOk?: () => void
  onCancel?: () => void
}

interface DialogType {
  type: 'info' | 'error' | 'confirm'
}

export function useDialog() {
  const [dialogs, setDialogs] = React.useState<Record<number, DialogOptions & { $dialog_state: boolean, $id: number }>>({})
  const uuid = React.useRef(1)

  const dialog = (options: DialogOptions & DialogType = { type: 'info' }) => {
    setDialogs((prev) => ({
      ...prev,
      [uuid.current]: { ...options, $dialog_state: true, $id: uuid.current },
    }))
    uuid.current++
  }

  function error(options: DialogOptions) {
    dialog({ ...options, type: 'error', title: options.title ?? 'Error' })
  }

  function confirm(options: DialogOptions) {
    dialog({ ...options, type: 'confirm', title: options.title ?? 'Tips' })
  }

  const contextHolder = Object.values(dialogs).map((options) => (
    <AlertDialog
      open={options.$dialog_state}
      key={options.$id}
      onOpenChange={(state) => {
        setDialogs((prev) => ({
          ...prev,
          [options.$id]: { $dialog_state: state, $id: options.$id },
        }))
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{options.description}</AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={options.onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={options.onOk}>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ))

  return [{ dialog, error, confirm }, contextHolder] as const
}
