import { ThemeProvider } from '@/providers/theme-provider'
import './globals.css'

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
            <div className='p-6 md:p-10'>{children}</div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
