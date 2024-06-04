"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Montserrat } from "@next/font/google";
import Script from "next/script";
import { useEffect } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);
  return (
    <html suppressHydrationWarning={true}>
      <head />
      <Script src="registersw.js"></Script>
      <body className={montserrat.className}>
        <ToastContainer position="bottom-left" />
        {children}
      </body>
    </html>
  );
}
