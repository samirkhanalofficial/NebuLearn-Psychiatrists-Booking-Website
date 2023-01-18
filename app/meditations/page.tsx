"use client";
import Head from "next/head";
import Nav from "@/components/Nav";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import style from "@/styles/Meditations.module.css";

import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";

export default function Psychiatrists() {
  const router = useRouter();
  const [meditations, setMeditations] = useState<
    {
      title: string;
      link: string;
      __v: number;
      _id: string;
    }[]
  >([]);
  async function getMeditations() {
    var res = await fetch("/api/admin/meditation", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      const data = await res.json();
      console.log(data);
      setMeditations(data);
    } else {
      toast.error("error getting datas");
    }
  }
  useEffect(() => {
    getMeditations();
  }, []);
  return (
    <div className={style.main}>
      <Head>
        <title>CodeStorm</title>
        <meta
          name="description"
          content="Medical Care for your mental health"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav route="meditations" />
      <div>
        <HeroSection
          firstWord=" Yoga"
          firstLine=" is the practice"
          secondLine="quieting the"
          lastWord="minds !"
          subTitle=<>
            Improve your mental health, spirituality <br /> and livings with
            NebulaCare.
          </>
          src="/yoga.png"
        >
          <></>
        </HeroSection>
      </div>
      <h1 className={style.h1}>Video you might find helpful !</h1>

      <div className={style.videoSection}>
        {meditations.map((video) => (
          <>
            <Card key={video._id} title={video.title} src={video.link} />
          </>
        ))}
      </div>
      <div className={style.footer}>
        <div className={style.dommy}></div>
        <Footer />
      </div>
    </div>
  );
}
