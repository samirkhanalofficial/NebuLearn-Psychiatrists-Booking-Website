"use client";

import Link from "next/link";
import style from "@/styles/Login.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormLayout from "@/components/Formlayout";
import Nav from "@/components/Nav";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
export type userType = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  date: string;
};
export default function Register({ params }: any) {
  const imageReg =
    "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=600";

  const [date, setDate] = useState("");
  const [appID, setAppId] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(imageReg);
  const [appointmentDone, setappoinmentDone] = useState(false);
  const [time, setTime] = useState("");
  const router = useRouter();

  async function getUser() {
    const token = await localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    const testId = await params.id;
    var res = await fetch("/api/psychiatrists/" + testId);
    if (res.status != 200) {
      toast.error("Error Fetching Data");
    } else {
      const data = await res.json();
      setImage(data.image);
      setPrice(data.price);
      setName(data.fullName);
    }
  }
  async function addMeditation(event: any) {
    event.preventDefault();
    const token = await localStorage.getItem("token");
    var res = await fetch("/api/admin/meetings/create", {
      method: "POST",
      body: JSON.stringify({
        date,
        time,
        doctor: params.id,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (res.status != 200) {
      toast.error("Error Booking for Appoinments");
    } else {
      const data = await res.json();
      setappoinmentDone(true);
      console.log(data);
      setAppId(data._id);
      setImage("/samirQr.jpg");

      toast.success(
        "Appoinment booked. Please pay the shown amount using esewa with remark shown here."
      );
    }
  }

  useEffect(() => {
    console.log(params);
    getUser();
  }, []);
  return (
    <>
      <Head>
        <title>Add Appoinment</title>
      </Head>
      <Nav route="psychiatrists" />
      {params.id}
      <form action="" onSubmit={async (event) => addMeditation(event)}>
        <FormLayout image={appointmentDone ? "/samirQr.jpg" : image}>
          {appointmentDone ? (
            <>
              <div className={style.h1}>
                <h1>Rs. {price}</h1>
              </div>
              <div className={style.h1}>
                <b>Reference: {appID}</b>
              </div>
              Please pay by scanning manually. Our admin will approve your
              appoinments after payments.
              <br />
              <br /> <br /> <br />
              <Link href="/profile" className="mybutton">
                Done
              </Link>
            </>
          ) : (
            <>
              <div className={style.h1}>
                <h1>Add Appoinment</h1>
              </div>
              <div className={style.LoginContent}>Date</div>
              <div>
                <input
                  type="date"
                  placeholder="Date"
                  className={style.inputField}
                  onChange={(event) => setDate(event.target.value)}
                  value={date}
                />
              </div>
              <div className={style.LoginContent}>Time</div>
              <div>
                <input
                  type="time"
                  placeholder="Choose a Time"
                  className={style.inputField}
                  onChange={(event) => setTime(event.target.value)}
                  value={time}
                />
              </div>
              <b>Price: Rs. {price}</b>
              <button className={style.loginButton}>Book Appoinment</button>
            </>
          )}
        </FormLayout>
      </form>
    </>
  );
}
