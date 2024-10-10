import { http, HttpResponse } from 'msw'

import { LoginReq, UserRes } from '@/api/user'
import { createSuccRes, createFailRes } from '@/api/utils'
import { sleep } from '../utils'


export const signin = http.post<never, LoginReq>('/api/signin', async ({ request }) => {
  await sleep(1500)

  const body = await request.json()
  if (body.username !== 'clover')
    return HttpResponse.json(createFailRes('403', 'user not find'))
  if (body.password !== 'admin')
    return HttpResponse.json(createFailRes('403', 'password error'))

  return HttpResponse.json(createSuccRes())
})

export const getUser = http.get('/api/user', async () => {
  await sleep(2000)

  return HttpResponse.json(createSuccRes<UserRes>({
    username: 'Clover You',
    sig: 'A flower may blossom again, but a person cannot get young again.',
    uid: '0001',
    phone: '18933799999',
    email: 'cloveryou02@gmail.com',
    avatar: 'https://0.gravatar.com/avatar/' +
      'bb935245d9ce4b3868849718160085f8bc5e62c0231177a24cca99bc99e27fe9?size=256',
    address: '番禺区桥南街道 10086 号',
    position: {
      country: 'China',
      province: { key: '0010086', label: '广东省' },
      city: { key: '0234532', label: '广州市' },
    },
  }))
})
