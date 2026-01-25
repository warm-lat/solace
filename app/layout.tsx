import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = localFont({
  src: "../public/fonts/Poppins.ttf",
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "warm.lat",
  description: "a discord bot lol",
  openGraph: {
    title: "warm.lat",
    description: "a discord bot lol",
    url: "https://warm.lat",
    siteName: "warm.lat",
    images: [
      {
        url: "https://r2.warm.lat/bot.jpg",
        alt: "warm.lat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
