"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "../styles/Nav.module.css";
import { AiFillHome, AiOutlineGroup } from "react-icons/ai";
import { GiMeditation, GiHamburgerMenu } from "react-icons/gi";
import { FaBriefcaseMedical, FaRegUserCircle } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { RiMentalHealthFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
export default function Nav({ route }: { route: string }) {
  const [navOpen, toggleNav] = useState(false);
  const router = useRouter();
  const [isLoggined, changeLoginnedStatus] = useState(false);
  useEffect(() => {
    checklogin();
  }, []);
  async function checklogin() {
    const token = await localStorage.getItem("token");
    console.log(token);
    if (token) {
      changeLoginnedStatus(true);
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
              <Link className={route == "/" ? style.active : ""} href={"/"}>
                <AiFillHome /> Home
              </Link>
            </li>
            <li>
              <Link
                className={route == "discussions" ? style.active : ""}
                href={"/discussions"}
              >
                <AiOutlineGroup /> Discussions
              </Link>
            </li>

            <li>
              <Link
                className={route == "psychiatrists" ? style.active : ""}
                href={"/psychiatrists"}
              >
                <FaBriefcaseMedical /> Psychiatrists
              </Link>
            </li>
            <li>
              <Link
                className={route == "meditations" ? style.active : ""}
                href={"/meditations"}
              >
                <GiMeditation /> Meditations
              </Link>
            </li>
            <li>
              <Link href={"/admin"}>
                <GrUserAdmin /> Admin Login
              </Link>
            </li>
            <li>
              <Link href={"/doctor"}>
                <RiMentalHealthFill /> Psychiatrists Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          {isLoggined ? (
            <>
              <Link
                href="/profile"
                className={
                  style.profile +
                  " " +
                  style.animateHeight +
                  " " +
                  (navOpen ? style.showHeightofButton : style.hideHeight)
                }
              >
                <FaRegUserCircle
                  style={{
                    fontSize: "25px",
                  }}
                />
                My Profile
              </Link>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
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
          )}
        </div>
      </nav>
    </>
  );
}
