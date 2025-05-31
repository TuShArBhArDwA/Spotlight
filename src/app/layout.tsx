import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider"
import { Manrope } from "next/font/google";
import {ClerkProvider} from '@clerk/nextjs'
import "./globals.css";

const manrope=Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})


export const metadata: Metadata = {
  title: "Spotlight",
  description: "AI Powered Webinar Streaming & Sales Platform",
  icons: {
  icon: [
    { url: '/favicon.png', type: 'image/png' },
  ],
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${manrope.variable} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
