import { ThemeProvider } from '@/providers/theme-provider'
import './globals.css'
import { AuthProvider } from '@/providers/auth-provider'
import { Toaster } from '@/components/ui/toaster'

export const metadata = {
  title: 'Spotter',
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
          <AuthProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='dark'
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <div>{children}</div>
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  )
}
