'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui'
import { useDialog } from '@/hook'

export interface HeaderAvatarProps {
  username: string
  avatar?: string
  email?: string
}

export function HeaderAvatar(props: HeaderAvatarProps) {
  const router = useRouter()

  const [dialog, dialogContextHolder] = useDialog()

  async function logout() {
    dialog.confirm({
      description: 'Are you sure you want to log out?',
      onOk: () =>
        setTimeout(() =>
          router.replace('/account/signin'),
          500,
        ),
    })
  }

  return <>
    {dialogContextHolder}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={props.avatar ?? 'https://github.com/shadcn.png'} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>{props.username}</span>
          <span className="text-[0.8rem] text-muted-foreground">{props.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={'/profile'}>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
}
