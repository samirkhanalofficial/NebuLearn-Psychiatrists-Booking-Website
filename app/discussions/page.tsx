"use client";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "@/styles/Discussion.module.css";

export default function Discussions() {
  const [query, setQuery] = useState("");
  const [discussions, setDiscussions] = useState<
    {
      email: string;
      question: string;
      _id: string;
    }[]
  >([]);
  const [isLoggined, changeLoginnedStatus] = useState(false);
  const router = useRouter();

  async function getData() {
    const token = await localStorage.getItem("token");
    const res = await fetch("/api/discussion/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (res.status != 200) {
      toast.error("Error getting Discussions");
    } else {
      const data = await res.json();
      console.log(data);
      setDiscussions(data);
    }
  }
  useEffect(() => {
    checklogin();
    getData();
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
        <title>Discussions</title>
      </Head>
      <Nav route="discussions" />
      <div className={style.sections}>
        <div className={style.discussionForm}>
          <form
            action=""
            onSubmit={async (e) => {
              e.preventDefault();
              const token = await localStorage.getItem("token");
              const res = await fetch("/api/discussion", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: token || "",
                },
                body: JSON.stringify({ question: query }),
              });
              if (res.status != 200) {
                toast.error("Error posting Query");
              } else {
                toast.success("Query Added Successfully");
                setQuery("");
                const dis = await res.json();
                setDiscussions([dis, ...discussions]);
              }
            }}
          >
            Queries:
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              name="queries"
              id="queries"
              placeholder="Write your Queries here. "
            ></textarea>
            <button>Submit</button>
          </form>
        </div>
        <div className={style.discussions}>
          <h2>
            Recents Queries: <br />
            <br />
          </h2>
          {discussions.map((discussion) => (
            <>
              <div key={discussion._id} className={style.discussion}>
                <b>{discussion.email}</b>
                <br />
                <br />
                <p>{discussion.question}</p>
                <Link href={"/discussions/" + discussion._id}>Reply</Link>
              </div>
            </>
          ))}
        </div>
      </div>
      <div>
        <div className={style.dommy}>{""}</div>
        <Footer />
      </div>
    </>
  );
}
