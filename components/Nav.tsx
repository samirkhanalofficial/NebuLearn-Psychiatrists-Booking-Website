"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "../styles/Nav.module.css";
import { AiFillHome, AiOutlineGroup } from "react-icons/ai";
import { GiMeditation, GiHamburgerMenu } from "react-icons/gi";
import { FaBriefcaseMedical } from "react-icons/fa";
export default function Nav({ route }: { route: string }) {
  const [navOpen, toggleNav] = useState(false);
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
        <div
          className={
            style.navigation +
            " " +
            style.animateHeight +
            " " +
            (navOpen ? style.showHeight : style.hideHeight)
          }
        >
          <ul className={style.navbar}>
            <li>
              <Link className={route == "/" ? style.active : ""} href={"/"}>
                <AiFillHome /> Home
              </Link>
            </li>
            <li>
              <Link
                className={route == "/discussions" ? style.active : ""}
                href={"/discussions"}
              >
                <AiOutlineGroup /> Discussions
              </Link>
            </li>

            <li>
              <Link
                className={route == "/psychiatrists" ? style.active : ""}
                href={"/psychiatrists"}
              >
                <FaBriefcaseMedical /> Psychiatrists
              </Link>
            </li>
            <li>
              <Link
                className={route == "/meditations" ? style.active : ""}
                href={"/"}
              >
                <GiMeditation /> Meditations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <button
            className={
              style.getStartedButton +
              " " +
              style.animateHeight +
              " " +
              (navOpen ? style.showHeightofButton : style.hideHeight)
            }
          >
            Get Started
          </button>
        </div>
      </nav>
    </>
  );
}
