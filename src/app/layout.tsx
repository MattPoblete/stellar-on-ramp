'use client'
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import MySorobanReactProvider from '../soroban/SorobanReactProvider';

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
        <MySorobanReactProvider>
          {children}
        </MySorobanReactProvider>
      </body>
    </html>
  );
}
