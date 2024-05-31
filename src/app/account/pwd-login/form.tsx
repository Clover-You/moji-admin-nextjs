"use client"

import {
  Button,
  Checkbox,
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input,
} from "@/components/ui"
import { useForm } from "react-hook-form"

interface LoginForm {
  username?: string
  password?: string
  remember?: boolean
}

export function UserForm() {
  const form = useForm<LoginForm>()

  function handleSubmit(formdata: LoginForm) {
    console.log(formdata)
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <FormField
        name="username"
        render={({ field }) => <>
          <FormItem>
            <FormLabel>Username</FormLabel>

            <FormControl>
              <Input placeholder="Please input username" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        </>}
      />

      <FormField
        name="passowrd"
        render={({ field }) => <>
          <FormItem>
            <FormLabel>Password</FormLabel>

            <FormControl>
              <Input placeholder="Please input password"  {...field} />
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
              <div className="items-top flex space-x-2">
                <Checkbox id="remember" checked={field.value} onCheckedChange={field.onChange} />

                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
                      peer-disabled:opacity-70"
                  >
                    Remember
                  </label>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


      <Button className="w-full">Signin</Button>
    </form>
  </Form>
}
