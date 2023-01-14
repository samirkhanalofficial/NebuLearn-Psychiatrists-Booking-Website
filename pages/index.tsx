import Head from "next/head";
import { Inter } from "@next/font/google";
import Nav from "../components/Nav";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
// RedHat, smartcontract in solidity
export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>CodeStorm</title>
        <meta
          name="description"
          content="Medical Care for your mental health"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav route={router.pathname} />
    </>
  );
}
