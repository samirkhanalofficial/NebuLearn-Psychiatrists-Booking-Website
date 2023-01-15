import React from "react";
import style from "../styles/nameCard.module.css";
import Image from "next/image";

export default function NameCard(props: {
  src: string;
  name: string;
  age: number;
  date: string;
  time: string;
}) {
  return (
    <div className={style.main}>
      <div className={style.useDetails}>
        <div className={style.useInfo}>User Name:{props.name} </div>
        <div className={style.useInfo}>User Age:{props.age} </div>
        <div className={style.useInfo}>User Date: {props.date}</div>
        <div className={style.useInfo}>User Time: {props.time}</div>
      </div>
      <div className={style.Photo}>
        <Image
          src={props.src}
          alt="header content"
          width={300}
          height={300}
          className={style.photo}
        />
      </div>
    </div>
  );
}
