import Nav from "@/components/Nav";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "../../styles/Psychiatrist.module.css";
import Image from "next/image";
import { BsFillPersonPlusFill } from "react-icons/bs";

export default function Psychiatrists() {
  const [users, setUsers] = useState<
    {
      age: number;
      email: string;
      fullName: string;
      image: string;
      role: string;
      __v: number;
      _id: string;
    }[]
  >([]);
  async function getPsychiatrists() {
    var users = await fetch("/api/get-user/psychiatrists", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (users.status == 200) {
      const data = await users.json();
      console.log(data);
      setUsers(data);
    } else {
      toast.error("error getting datas");
    }
  }
  useEffect(() => {
    getPsychiatrists();
  }, []);
  return (
    <>
      <Head>
        <title>Psychiatrists</title>
      </Head>
      <Nav route="psychiatrists" />
      <div style={{ padding: "50px" }}></div>
      <div className={style.cards}>
        {users.map((user) => (
          <>
            <div className={style.card} key={user._id}>
              <Image
                alt={user.fullName}
                src={user.image}
                width={200}
                height={200}
              />
              <br />
              <b>Name : </b>
              {user.fullName} <br />
              <b>Email : </b>
              {user.email} <br />
              <b>Age : </b>
              {user.age} <br />
              <Link
                className={style.button + " " + style.addPsychiatrist}
                style={{
                  display: "flex",
                  width: "300px",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  textDecoration: "none",
                }}
                href={"/psychiatrists/" + user._id}
              >
                <BsFillPersonPlusFill />
                Book an Appoinment
              </Link>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
