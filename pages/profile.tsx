import Nav from "@/components/Nav";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import style from "../styles/Discussion.module.css";

export default function Profile() {
  const [appoinments, setAppoinments] = useState<
    {
      drName: string;
      time: string;
      id: string;
    }[]
  >([
    { drName: "Sumit Ray", time: "Date", id: "hsbafhgdfh" },
    { drName: "Samir Khanal", time: "Date", id: "yewgfbhn" },
  ]);
  const router = useRouter();
  useEffect(() => {
    checklogin();
  }, []);
  async function checklogin() {
    const token = await localStorage.getItem("token");
    console.log(token);
    if (!token) {
      router.push("/login");
    }
  }
  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <Nav route="profile" />
      <div style={{ padding: "50px" }}></div>
      <div className={style.sections}>
        <div
          style={{
            textAlign: "center",
          }}
          className={style.discussionForm}
        >
          <form action="">
            <FaRegUserCircle
              style={{
                fontSize: "205px",
              }}
            />
            <br />
            <br />
            <h2>My Profile:</h2> <br />
            <b>Name:</b> Samir Khanal
            <br />
            <br />
            <b>Age:</b>18
          </form>
        </div>
        <div className={style.discussions}>
          <h2>
            Appoinments: <br />
            <br />
          </h2>
          {appoinments.map((appoinment) => (
            <>
              <div key={appoinment.id} className={style.discussion}>
                <b>{appoinment.drName}</b>
                <br />
                <br />
                <p>{appoinment.time}</p>
                <Link href={"/appoinment/" + appoinment.id}>join</Link>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
