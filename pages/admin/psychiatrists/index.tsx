import Nav from "@/components/admins/Nav";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "../../../styles/Psychiatrist.module.css";
import { FaTrash } from "react-icons/fa";
export default function Dashboard() {
  const [users, setUsers] = useState<
    {
      age: number;
      email: string;
      fullName: string;
      image: string;
      price: string;
      role: string;
      __v: number;
      _id: string;
    }[]
  >([]);
  async function getPsychiatrists() {
    const token = await localStorage.getItem("AdminToken");
    var users = await fetch("/api/get-user/psychiatrists", {
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (users.status == 200) {
      const data = await users.json();
      setUsers(data);
    } else {
      toast.error("error getting datas");
    }
  }
  useEffect(() => {
    getPsychiatrists();
  }, []);
  return (
    <div>
      <Head>
        <title>Psychiatrists</title>
      </Head>
      <Nav route="psychiatrists" />
      <div className="row">
        <h2>Psychiatrists</h2>
        <Link
          href="/admin/psychiatrists/create"
          className={style.addPsychiatrist}
        >
          Add new
        </Link>
      </div>
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
              <b>Price : </b>Rs.
              {user.price} <br />
              <Link
                style={{
                  display: "block",
                  backgroundColor: "red",
                  width: "120px",
                }}
                href="#"
                onClick={async () => {
                  const token = await localStorage.getItem("AdminToken");
                  var res = await fetch("/api/admin/delete/" + user._id, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      authorization: token || "",
                    },
                  });
                  if (res.status != 200) {
                    toast.error("error deleting psychiatrists");
                  } else {
                    toast.success("deleted psychiatrists");
                    setUsers(users.filter((u) => u.email != user.email));
                  }
                }}
                className={style.addPsychiatrist}
              >
                <FaTrash />
                Delete
              </Link>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
