"use client"

import React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import {
  Button,
  Checkbox,
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input,
} from "@/components/ui"

import { userLogin } from "@/api/user"
import { AxiosRes, Status } from "@/api/request"
import { useAlertDialog } from "@/hook"
import { Icons } from "@/components/icons"
import { Optional } from "@/components/utils"
import { useAppDispatch } from "@/hook/redux"
import { loadUser } from "@/lib/store/user"
import { isRespResult } from "@/api/utils"

interface LoginForm {
  username: string
  password: string
  remember?: boolean
}

export function UserForm() {
  const form = useForm<LoginForm>({
    defaultValues: { username: "clover", password: "admin", remember: false },
  })

  const [alertContextProvider, dialogAPI] = useAlertDialog()

  const touter = useRouter()

  const [loading, setLoad] = React.useState(false)

  const useDispatch = useAppDispatch()

  async function doLoadUser() {
    try {
      const response = await useDispatch(loadUser()).unwrap()
      return response
    } catch (err) {
      if (err instanceof Object) {
        const error = err as AxiosRes
        isRespResult(error.data) && dialogAPI.show({ children: error.data.message })
      }

      if (err instanceof Error) throw err

      return false
    }
  }

  async function handleSubmit(formdata: LoginForm) {
    try {
      setLoad(true)

      const response = await userLogin(formdata)
      const { code, message } = response.data
      if (code !== Status.Success) return dialogAPI.show({ children: message })

      if (!await doLoadUser()) return

      touter.replace("/")
    } catch (err) {
      let errMsg = "unknown error"
      if (err instanceof Error) errMsg = err.message

      dialogAPI.show({ children: errMsg })
    } finally {
      setLoad(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          name="username"
          render={({ field }) => <>
            <FormItem>
              <FormLabel>Username</FormLabel>

              <FormControl>
                <Input placeholder="Please input username" {...field} disabled={loading} />
              </FormControl>

              <FormMessage />
            </FormItem>
          </>}
        />

        <FormField
          name="password"
          render={({ field }) => <>
            <FormItem>
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input placeholder="Please input password"  {...field} disabled={loading} />
              </FormControl>

              <FormMessage />
            </FormItem>
          </>}
        />

        <FormField
          name="remember"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="items-top flex justify-between leading-none">
                  <div className="items-top flex space-x-2">
                    <Checkbox id="remember" checked={field.value}
                      onCheckedChange={field.onChange} />

                    <div className="grid gap-1.5">
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
                          peer-disabled:opacity-70"
                      >
                        Remember
                      </label>
                    </div>
                  </div>

                  <div className="items-top flex space-x-2">
                    <Link href={"/account/forget"}>forget</Link>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={loading}>
          <Optional
            if={loading}
            ifCase={<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          />
          Signin
        </Button>
      </form>

      {alertContextProvider}

    </Form>

  )
}
