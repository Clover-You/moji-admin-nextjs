import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '首页',
}

export default function Page() {
  return <>dashboard page <Link href="/account/signin">s</Link></>
}
