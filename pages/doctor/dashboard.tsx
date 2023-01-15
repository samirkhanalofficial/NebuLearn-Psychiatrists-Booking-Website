import Nav from "@/components/doctor/Nav";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle, FaVideo } from "react-icons/fa";
import { toast } from "react-toastify";
import style from "../../styles/Discussion.module.css";

type appoinmentType = {
  _id: string;
  client: string;
  doctor: string;
  date: string;
  time: string;
  price: string;
  clientAge: number;
  clientName: string;
  doctorName: string;
  medicines: string[];
  paid: boolean;
  __v: number;
};
export default function Profile() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [appoinments, setAppoinments] = useState<appoinmentType[]>([]);
  const router = useRouter();
  async function getMyAppoinments() {
    const token = await localStorage.getItem("PsyToken");
    const testId = await router.query.id;
    var res = await fetch("/api/admin/meetings/psychiatrist", {
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
  async function getUser() {
    const token = await localStorage.getItem("PsyToken");
    if (!token) {
      router.push("/doctor/login");
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
      setEmail(data.email);
    }
    await getMyAppoinments();
  }
  useEffect(() => {
    getUser();
    getMyAppoinments();
  }, []);

  return (
    <>
      <Head>
        <title>Meetings</title>
      </Head>
      <Nav route="/" />
      <div style={{ padding: "50px" }}></div>
      <div className={style.sections}>
        <div
          style={{
            textAlign: "center",
          }}
          className={style.discussionForm}
        >
          <form action="">
            {image.length < 1 ? (
              <FaRegUserCircle
                style={{
                  fontSize: "205px",
                }}
              />
            ) : (
              <Image alt="doctor" src={image} />
            )}
            <br />
            <br />
            <h2>Hello Doctor:</h2> <br />
            <b>Name:</b> {name}
            <br />
            <br />
            <b>Email: </b>
            {email} <br />
            <button
              onClick={async () => {
                await localStorage.removeItem("psyToken");
                router.push("/doctor");
              }}
            >
              {" "}
              Logout{" "}
            </button>
          </form>
        </div>
        <div className={style.discussions}>
          <h2>
            Meetings to Join: <br />
            <br />
          </h2>
          {appoinments.map((appoinment) => (
            <>
              <div
                key={appoinment._id}
                style={{ overflowX: "hidden" }}
                className={style.discussion}
              >
                <b>Client: {appoinment.clientName}</b> <br />
                <br />
                <b>{appoinment.date}</b>
                <p>{appoinment.time}</p>
                <br />
                <br />
                <p>Price: Rs. {appoinment.price}</p>
                <p>Reference: {appoinment._id}</p>
                <br />
                {!appoinment.paid ? (
                  <Link
                    className="mybutton"
                    href={"/videocall/" + appoinment._id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    onClick={async () => {}}
                  >
                    join <FaVideo />
                  </Link>
                ) : (
                  "UnApproved"
                )}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
