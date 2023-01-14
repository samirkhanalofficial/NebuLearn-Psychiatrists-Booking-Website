"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "../styles/Nav.module.css";
import { AiFillHome, AiFillMedicineBox } from "react-icons/ai";
import { GiDoctorFace, GiMeditation, GiHamburgerMenu } from "react-icons/gi";
export default function Nav() {
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
              <Link href={"/"}>
                <AiFillHome /> Home
              </Link>
            </li>
            <li>
              <Link href={"/medicines"}>
                <AiFillMedicineBox /> Medicines
              </Link>
            </li>

            <li>
              <Link href={"/psychiatrists"}>
                <GiDoctorFace /> Psychiatrists
              </Link>
            </li>
            <li>
              <Link href={"/"}>
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
