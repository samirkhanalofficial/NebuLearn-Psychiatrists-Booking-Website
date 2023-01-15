import React from "react";
import style from "../styles/card.module.css";

export default function Card(props: { title: string; src: string }) {
  return (
    <div className={style.mainForm}>
      <div className={style.videoSection}>
        <iframe
          className="video"
          width="400"
          height="350"
          allowFullScreen
          src={props.src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <p className={style.title}>
        <b>Title :</b> {props.title}
      </p>
    </div>
  );
}
