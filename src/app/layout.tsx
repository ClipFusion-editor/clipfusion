import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Providers from "./providers";

library.add(fas);

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClipFusion",
  description: "Professional video editing software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
