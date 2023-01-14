import { Html, Head, Main, NextScript } from "next/document";

import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={montserrat.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
