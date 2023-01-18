"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import style from "../styles/HeroSection.module.css";
export default function HeroSection(props: {
  children: React.ReactNode;
  firstLine: string;
  secondLine: string;
  subTitle: ReactNode;
  src: string;
  firstWord: string;
  lastWord: string;
}) {
  return (
    <>
      <div className={style.mainForm}>
        <div className={style.TextContent}>
          <h1 className={style.firstheading}>
            <span className={style.blueWord}>{props.firstWord}</span>{" "}
            {props.firstLine} {props.secondLine}
            <span className={style.blueWord}> {props.lastWord}</span>
          </h1>

          <p className={style.subTitle}>{props.subTitle}</p>
          {props.children}
        </div>
        <div className={style.imageContent}>
          <Image
            src={props.src}
            alt="header content"
            width={300}
            height={300}
            className={style.photo}
          />
        </div>
      </div>
    </>
  );
}
