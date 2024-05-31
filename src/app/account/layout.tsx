export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>
    <div className="w-[460px] m-auto">{children}</div>
  </>
}
