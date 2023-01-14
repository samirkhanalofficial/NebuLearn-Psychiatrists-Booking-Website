import Head from "next/head";
import Nav from "../components/Nav";
import { useRouter } from "next/router";
import HeroSection from "@/components/HeroSection";
import style from "../styles/Meditations.module.css";

import React, { useState } from "react";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export default function Psychiatrists() {
  const router = useRouter();
  const [video, setVideo] = useState<
    {
      title: string;
      link: string;
      id: string;
    }[]
  >([
    {
      title: "Takeaway",
      link: "https://www.youtube.com/embed/1XCObQjSHIs",
      id: "hsbafhgdfh",
    },
    {
      title: "Focused meditation",
      link: "https://www.youtube.com/embed/inpok4MKVLM",
      id: "yewgfbhn",
    },
    {
      title: "mantra meditation",
      link: "https://www.youtube.com/embed/O-6f5wQXSu8",
      id: "yewgfbhn",
    },
  ]);
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
        />
      </div>
      <h1 className={style.h1}>Video you might find helpful !</h1>

      <div className={style.videoSection}>
        {video.map((video) => (
          <>
            <Card key={video.id} title={video.title} src={video.link} />
          </>
        ))}
      </div>
      <div className={style.footer}>
        <div className={style.dommy}>{""}</div>
        <Footer />
      </div>
    </div>
  );
}
