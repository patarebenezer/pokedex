import type { Metadata } from "next";
import "@/styles/globals.css";
import Providers from "@/app/providers";
import { Toaster } from "sonner";

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
   <body>
    <Providers>{children}</Providers>
    <Toaster richColors />
   </body>
  </html>
 );
}
