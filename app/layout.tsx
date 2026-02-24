import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "PokeDex",
 description: "A simple PokeDex built with Next.js and the PokeAPI.",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang='en' suppressHydrationWarning>
   <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    {children}
   </body>
  </html>
 );
}
