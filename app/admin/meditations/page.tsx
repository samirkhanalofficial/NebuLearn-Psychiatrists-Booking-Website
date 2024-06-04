"use client";
import Nav from "@/components/admins/Nav";
import head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "@/styles/Psychiatrist.module.css";
import { FaTrash } from "react-icons/fa";
import Card from "@/components/Card";
import NoResult from "@/components/NoResult";
import Loading from "@/components/loading";
export default function Dashboard() {
  const [loading, setloading] = useState(true);
  const [meditations, setMeditations] = useState<
    {
      title: string;
      link: string;
      __v: number;
      _id: string;
    }[]
  >([]);
  async function getMeditations() {
    setloading(true);
    var res = await fetch("/api/admin/meditation", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      const data = await res.json();
      console.log(data);
      setloading(false);
      setMeditations(data);
    } else {
      toast.error("error getting datas");
      setloading(false);
    }
  }
  useEffect(() => {
    getMeditations();
  }, []);
  return (
    <div>
      <head>
        <title>Meditations</title>
      </head>
      <Nav route="meditations" />
      <div className="row">
        <h2>Meditations</h2>
        <Link
          href="/admin/meditations/create"
          className={style.addPsychiatrist}
        >
          Add new
        </Link>
      </div>
      <div className={style.cards}>
        {loading ? (
          <Loading />
        ) : meditations.length <= 0 ? (
          <NoResult item="Meditation" />
        ) : (
          meditations.map((meditation) => (
            <>
              <div className={style.card} key={meditation._id}>
                <Card
                  title={meditation.title}
                  src={meditation.link}
                  key={meditation._id}
                />
                <br />

                <button
                  style={{
                    display: "block",
                    backgroundColor: "red",
                    width: "120px",
                  }}
                  onClick={async () => {
                    const token = await localStorage.getItem("AdminToken");
                    var res = await fetch(
                      "/api/admin/meditation/delete/" + meditation._id,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          authorization: token || "",
                        },
                      }
                    );
                    if (res.status != 200) {
                      toast.error("error deleting meditation");
                    } else {
                      toast.success("deleted meditation");
                      setMeditations(
                        meditations.filter((m) => m._id != meditation._id)
                      );
                    }
                  }}
                  className={style.addPsychiatrist}
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
}
