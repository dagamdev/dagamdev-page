import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dagamdev - Desarrollador Web & Trader",
  description:
    "Portfolio profesional de desarrollador web full-stack y trader. Especializado en Next.js, React, TypeScript y estrategias de trading.",
  other: {
    "google-adsense-account": "ca-pub-7544389116802597",
  },
  icons: {
    icon: [
      {
        url: "images/icono.png",
        type: "image/png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
