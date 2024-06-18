import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon app",
  description: "All pokemon informations you need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="mt-16">
          {children}
        </div>
      </body>
      <GoogleAnalytics gaId="G-PB5HVSEEC1" />
    </html>
  );
}
