'use client'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { UserForm } from './form'

export default function SigninCard() {
  return <>
    <Card className="relative w-auto rounded-xl mt-[20vh]">
      <CardHeader>
        <CardTitle className="text-2xl">
          Login
        </CardTitle>

        <CardDescription>
          Don&apos;t have an account yet? <Link href="/account/signup">Go to signup</Link>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <UserForm />
      </CardContent>
    </Card>
  </>
}
