import React from "react";
import style from "../styles/footer.module.css";
import { FaFacebookF } from "react-icons/fa";
import {
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillGithub,
  AiOutlineCopyrightCircle,
} from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className={style.footer}>
        <div className={style.logoSection}>
          <div className={style.iconlogo}>
            <FaFacebookF />
          </div>
          <div className={style.iconlogo}>
            <AiOutlineTwitter />
          </div>
          <div className={style.iconlogo}>
            <BsYoutube />
          </div>
          <div className={style.iconlogo}>
            <AiFillInstagram />
          </div>
          <div className={style.iconlogo}>
            <AiFillGithub />
          </div>
        </div>
        <p className={style.h3}>
          Copyright <AiOutlineCopyrightCircle /> www.codestorm.samirk.com.np -
          All rights reserved
        </p>
      </div>
    </>
  );
}
