import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Neza Construction Ltd",
  description: "Expert construction & renovation services in Colchester and beyond. New builds, extensions, renovations, plumbing, electrics and finishing trades.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={`${openSans.variable} ${montserrat.variable} font-sans antialiased overflow-x-hidden text-gray-800`}>
        {children}
      </body>
    </html>
  );
}
