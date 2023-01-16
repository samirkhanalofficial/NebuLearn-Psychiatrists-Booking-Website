import React from "react";
import style from "../styles/comments.module.css";
import { MdSend } from "react-icons/md";

export default function Post(props: { comments: string; userName: string }) {
  return (
    <>
      <div className={style.main}>
        <div className={style.UserName}>
          <span className={style.title}>{props.userName}</span>
        </div>
        <div className={style.comments}>{props.comments}</div>
        <div className={style.inputField}>
          <input type="text" placeholder="Comments" className={style.input} />
          <MdSend />
        </div>
      </div>
    </>
  );
}
