"use client";
import ReactLenis from "@studio-freight/react-lenis";
import { Inter } from "next/font/google";
import React from "react";

import "../styles/globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lenisOptions = {
    lerp: 5,
    duration: 1.2,
    smoothTouch: false,
    smooth: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <html lang="en">
        <body className={`${inter.className} overflow-x-hidden w-screen`}>
          {children}
          <Footer />
        </body>
      </html>
    </ReactLenis>
  );
}