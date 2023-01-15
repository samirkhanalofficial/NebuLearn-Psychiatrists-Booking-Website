import React from "react";
import style from "../styles/footer.module.css";
import { FaFacebookF } from "react-icons/fa";
import {
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillGithub,
  AiOutlineCopyrightCircle,
} from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className={style.footer}>
        <div className={style.logoSection}>
          <div className={style.iconlogo}>
            <Link href="https://www.facebook.com/profile.php?id=100004349836670">
              <FaFacebookF />
            </Link>
          </div>
          <div className={style.iconlogo}>
            <AiOutlineTwitter />
          </div>
          <div className={style.iconlogo}>
            <SiGmail />
          </div>
          <div className={style.iconlogo}>
            <AiFillInstagram />
          </div>
          <div className={style.iconlogo}>
            <Link href="https://github.com/Sumitray1" className={style.link}>
              <AiFillGithub />
            </Link>
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
