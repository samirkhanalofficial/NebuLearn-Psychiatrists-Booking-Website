import Link from "next/link";
import style from "../../styles/Login.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import FormLayout from "../../components/Formlayout";
import Nav from "@/components/Nav";
import Head from "next/head";
export type userType = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  date: string;
};
export default function Register() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  async function addMeditation(event: any) {
    event.preventDefault();
    const token = await localStorage.getItem("AdminToken");
    var res = await fetch("/api/admin/meditation/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        link,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (res.status != 200) {
      toast.error("Error adding Meditation");
    } else {
      toast.success("Added Meditation");
    }
  }

  useEffect(() => {}, []);
  const imageReg =
    "https://images.pexels.com/photos/7468236/pexels-photo-7468236.jpeg?auto=compress&cs=tinysrgb&w=1600";

  return (
    <>
      <Head>
        <title>Add Appoinment</title>
      </Head>
      <Nav route="psychiatrists" />
      <form action="" onSubmit={async (event) => addMeditation(event)}>
        <FormLayout image={imageReg}>
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
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </div>
            <div className={style.LoginContent}>Time</div>
            <div>
              <input
                type="time"
                placeholder="Choose a Time"
                className={style.inputField}
                onChange={(event) => setLink(event.target.value)}
                value={link}
              />
            </div>

            <button className={style.loginButton}>Book Appoinment</button>
          </>
        </FormLayout>
      </form>
    </>
  );
}
