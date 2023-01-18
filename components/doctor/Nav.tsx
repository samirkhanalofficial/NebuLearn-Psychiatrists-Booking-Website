"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "../../styles/Nav.module.css";
import { AiFillHome, AiOutlineGroup } from "react-icons/ai";
import { GiMeditation, GiHamburgerMenu } from "react-icons/gi";
import { FaBriefcaseMedical, FaRegUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function Nav({ route }: { route: string }) {
  const [navOpen, toggleNav] = useState(false);
  const [isLoggined, changeLoginnedStatus] = useState(false);
  const router = useRouter();
  useEffect(() => {
    checklogin();
  }, []);
  async function checklogin() {
    const token = await localStorage.getItem("PsyToken");
    console.log(token);
    if (!token) {
      router.push("/doctor");
    }
  }
  return (
    <>
      <nav className={style.nav}>
        <div className={style.mobileNav}>
          <div className={style.logo}>
            <Image alt="nebula logo" src={"/logo.png"} width={70} height={70} />
          </div>

          <GiHamburgerMenu
            onClick={() => toggleNav(!navOpen)}
            className={style.menu}
          />
        </div>

        <div>
          <button
            onClick={async () => {
              await localStorage.removeItem("PsyToken");
              router.push("/doctor/");
            }}
            className={
              style.getStartedButton +
              " " +
              style.animateHeight +
              " " +
              (navOpen ? style.showHeightofButton : style.hideHeight)
            }
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
