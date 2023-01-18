"use client";
import Nav from "@/components/Nav";
import { usePathname, useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import style from "@/styles/index.module.css";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

// RedHat, smartcontract in solidity
export default function Home() {
  let [loginned, setloginned] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  async function checkLogin() {
    const token = await localStorage.getItem("token");
    if (!token) {
    } else {
      setloginned(true);
    }
  }
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <div className={style.main}>
      <head>
        <title>CodeStorm</title>
        <meta
          name="description"
          content="Medical Care for your mental health"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Nav route={pathName!} />
      <div className={style.documentSection}>
        <HeroSection
          firstWord=" Brilliant"
          firstLine=" things happen"
          secondLine="in calm "
          lastWord="minds !"
          subTitle=<>
            Improve your mental health, spirituality <br /> and livings with
            NebulaCare.
          </>
          src="/brain.png"
        >
          <div className={style.buttonSection}>
            <button
              onClick={() => {
                router.push(loginned ? "/psychiatrists" : "/login");
              }}
              className={style.button}
            >
              {!loginned ? "Get Started" : "See Psychiatrists"}
            </button>
          </div>
        </HeroSection>
      </div>
      <footer className={style.footer}>
        <Footer />
      </footer>
    </div>
  );
}
