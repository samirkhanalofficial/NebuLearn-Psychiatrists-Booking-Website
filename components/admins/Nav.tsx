"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "../../styles/Nav.module.css";
import { AiFillHome, AiOutlineGroup } from "react-icons/ai";
import { GiMeditation, GiHamburgerMenu } from "react-icons/gi";
import { FaBriefcaseMedical, FaRegUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
export default function Nav({ route }: { route: string }) {
  const [navOpen, toggleNav] = useState(false);
  const [isLoggined, changeLoginnedStatus] = useState(false);
  const router = useRouter();
  useEffect(() => {
    checklogin();
  }, []);
  async function checklogin() {
    const token = await localStorage.getItem("AdminToken");
    console.log(token);
    if (!token) {
      router.push("/admin");
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
              <Link
                className={route == "/" ? style.active : ""}
                href={"/admin/dashboard"}
              >
                <AiFillHome /> Meetings
              </Link>
            </li>

            <li>
              <Link
                className={route == "psychiatrists" ? style.active : ""}
                href={"/admin/psychiatrists"}
              >
                <FaBriefcaseMedical /> Psychiatrists
              </Link>
            </li>
            <li>
              <Link
                className={route == "meditations" ? style.active : ""}
                href={"/admin/meditations"}
              >
                <GiMeditation /> Meditations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <button
            onClick={async () => {
              await localStorage.removeItem("AdminToken");
              router.push("/admin/");
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
