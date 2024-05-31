import { Metadata } from "next"

import { Card } from "@/components/ui"
import { UserForm } from "./form"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const metadata: Metadata = {
  title: "登录",
}

export default function Page() {
  return <>
    <Card className="relative w-auto rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl">
          Login
        </CardTitle>

        <CardDescription>
          Don&apos;t have an account yet? <Link href="/account/signup">Goto signup</Link>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <UserForm />
      </CardContent>
    </Card>
  </>
}
