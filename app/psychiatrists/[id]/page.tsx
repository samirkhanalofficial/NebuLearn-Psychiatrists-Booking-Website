"use client";

import Link from "next/link";
import style from "@/styles/Login.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormLayout from "@/components/Formlayout";
import Nav from "@/components/Nav";
import head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/loading";
import NoResult from "@/components/NoResult";
import Image from "next/image";
export type userType = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  date: string;
};
export default function Register({ params, searchParams }: any) {
  const success = searchParams.success ?? "";
  const [loading, setloading] = useState(true);
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
      setloading(false);
    } else {
      const data = await res.json();
      setImage(data.image);
      setPrice(data.price);
      setName(data.fullName);
      setloading(false);
    }
  }
  async function addMeeting(event: any) {
    event.preventDefault();
    try {
      setloading(true);
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
        setloading(false);
      } else {
        const data = await res.json();
        window.location = data.payment_url;
      }
    } catch (e: any) {
      toast.error(e);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <head>
        <title>Add Appoinment</title>
      </head>
      <Nav route="psychiatrists" />
      <form action="" onSubmit={async (event) => addMeeting(event)}>
        <FormLayout
          image={
            success == "true"
              ? "/success.webp"
              : success == "false"
              ? "/fail.png"
              : image
          }
        >
          {loading ? (
            <Loading />
          ) : !name && !appointmentDone ? (
            <NoResult item="Data of psychiatrist" />
          ) : success != "" ? (
            <>
              <div className={style.h1}>
                <h1
                  style={{
                    color: success == "true" ? "" : "red",
                  }}
                >
                  Payment {success == "true" ? "Success" : "Failed"}
                </h1>
              </div>
              <div>
                <b>Reference ID : {searchParams.meetingid ?? ""}</b>
              </div>
              Please take a screenshot of this id, this will help you to claim
              your money back in case of payment errors.
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
              <hr />
              <br />
              <div className={style.LoginContent}>Psychiatrist Name</div>
              <div>
                <input
                  className={style.inputField}
                  disabled={true}
                  value={name}
                />
              </div>
              <div className={style.LoginContent}>Price (Rs)</div>
              <div>
                <input
                  className={style.inputField}
                  disabled={true}
                  value={price}
                />
              </div>

              <button className={style.loginButton}>Pay With Khalti </button>
            </>
          )}
        </FormLayout>
      </form>
    </>
  );
}
