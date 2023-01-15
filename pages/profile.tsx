import Nav from "@/components/Nav";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import style from "../styles/Discussion.module.css";

type appoinmentType = {
  _id: string;
  client: string;
  doctor: string;
  date: string;
  time: string;
  price: string;
  clientAge: number;
  medicines: string[];
  paid: boolean;
  __v: number;
};
export default function Profile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [appoinments, setAppoinments] = useState<appoinmentType[]>([]);
  const router = useRouter();
  async function getMyAppoinments() {
    const token = await localStorage.getItem("token");
    const testId = await router.query.id;
    var res = await fetch("/api/admin/meetings/user", {
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (res.status != 200) {
      toast.error("Error Fetching Data");
    } else {
      const data = await res.json();
      setAppoinments(data);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const token = await localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    var res = await fetch("/api/my-details/", {
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (res.status != 200) {
      toast.error("Error Fetching Data");
    } else {
      const data = await res.json();
      console.log(data);
      setName(data.fullName);
      setAge(data.age);
    }
    await getMyAppoinments();
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
            <b>Name:</b> {name}
            <br />
            <br />
            <b>Age:</b>
            {age} <br />
            <button
              onClick={async () => {
                await localStorage.removeItem("token");
                router.push("/");
              }}
            >
              {" "}
              Logout{" "}
            </button>
          </form>
        </div>
        <div className={style.discussions}>
          <h2>
            Appoinments: <br />
            <br />
          </h2>
          {appoinments.map((appoinment) => (
            <>
              <div key={appoinment._id} className={style.discussion}>
                <b>{appoinment.date}</b>

                <p>{appoinment.time}</p>
                <br />
                <br />
                <p>Price: Rs. {appoinment.price}</p>
                <p>Reference: {appoinment._id}</p>
                <br />
                <Link href={"/samirQr.jpg"}>See Qr</Link>
                {appoinment.paid ? (
                  <Link href={"/appoinment/" + appoinment._id}>join</Link>
                ) : (
                  "Unpaid(you must pay to connect)"
                )}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
