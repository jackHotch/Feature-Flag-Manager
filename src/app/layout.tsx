import { ThemeProvider } from '@/providers/theme-provider'
import './globals.css'

export const metadata = {
  title: 'Feature Flags',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <div>{children}</div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
