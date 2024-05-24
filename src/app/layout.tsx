'use client'
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import StoreProvider from "@/providers/StoreProvider";

const manrope = Manrope({ 
  weight: ['200', '800' ],
  subsets: ["latin"] 
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
