"use client";
import style from "@/styles/Login.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormLayout from "@/components/Formlayout";
import Nav from "@/components/admins/Nav";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [loading, setloading] = useState(false);
  async function addMeditation(event: any) {
    try {
      setloading(true);
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
        setloading(false);
      } else {
        setloading(false);
        toast.success("Added Meditation");
        router.push("/admin/meditations");
      }
    } catch (e: any) {
      toast.error(e);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {}, []);
  const imageReg =
    "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=600";
  return (
    <>
      <head>
        <title>Add Meditation</title>
      </head>
      <Nav route="meditations" />
      <form action="" onSubmit={async (event) => addMeditation(event)}>
        <FormLayout image={imageReg}>
          <>
            <div className={style.h1}>
              <h1>Add Meditation</h1>
            </div>
            <div className={style.LoginContent}>Title</div>
            <div>
              <input
                type="text"
                placeholder="title"
                className={style.inputField}
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </div>
            <div className={style.LoginContent}>Youtube Link</div>
            <div>
              <input
                type="text"
                placeholder="https://youtube.com/embed/id"
                className={style.inputField}
                onChange={(event) => setLink(event.target.value)}
                value={link}
              />
            </div>

            <button className={style.loginButton}>Add Meditation</button>
          </>
        </FormLayout>
      </form>
    </>
  );
}
