import React from "react";
import style from "../styles/comments.module.css";

export default function Comment(props: { comments: string; userName: string }) {
  return (
    <div className={style.main}>
      <div className={style.UserName}>
        <span className={style.title}>{props.userName}</span>
      </div>
      <div className={style.comments}>{props.comments}</div>
    </div>
  );
}
