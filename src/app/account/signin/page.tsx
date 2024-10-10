import { Metadata } from 'next'

import SigninCard from './card'

export const metadata: Metadata = {
  title: '登录',
}

export default function Page() {
  return <>
    <SigninCard />
  </>
}
