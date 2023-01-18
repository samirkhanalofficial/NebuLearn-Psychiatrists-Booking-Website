"use client";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "@/styles/Discussion.module.css";
type commentType = { reply: string; email: string; _id: string };
type discussionType = {
  email: string;
  question: string;
  _id: string;
  comment: commentType[];
};
export default function Discussions({ params }: any) {
  const [query, setQuery] = useState("");
  const [comment, setcomments] = useState<commentType[]>([]);
  const [discussion, setDiscussion] = useState<discussionType>({
    email: "",
    question: "",
    _id: "",
    comment: [],
  });
  const router = useRouter();

  async function getData() {
    const token = await localStorage.getItem("token");
    const res = await fetch("/api/discussion/" + params.id + "/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (res.status != 200) {
      toast.error("Error getting Discussion");
    } else {
      const data = await res.json();
      setcomments(data.comment);
      setDiscussion(data);
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
        <title>Comments</title>
      </Head>
      <Nav route="discussions" />
      <div className={style.sections}>
        <div className={style.discussionForm}>
          <b>{discussion.email}</b>
          <br />
          {discussion.question}
          <br />
          <br />
          <hr />
          <form
            action=""
            onSubmit={async (e) => {
              e.preventDefault();
              const token = await localStorage.getItem("token");
              const res = await fetch(
                "/api/discussion/" + params.id + "/comment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    authorization: token || "",
                  },
                  body: JSON.stringify({ comment: query }),
                }
              );
              if (res.status != 200) {
                toast.error("Error posting Comment");
              } else {
                const data: commentType = await res.json();
                console.log(data);
                setcomments([data, ...comment]);
                toast.success("Comment Added Successfully");
                setQuery("");
              }
            }}
          >
            Comment:
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              name="queries"
              id="queries"
              placeholder="Write your Comment here. "
            ></textarea>
            <button>Submit</button>
          </form>
        </div>
        <div className={style.discussions}>
          <h2>
            Recents Comments: <br />
            <br />
          </h2>
          {comment.map((com) => (
            <>
              <div key={com._id} className={style.discussion}>
                <b>{com.email}</b>
                <br />
                <br />
                <p>{com.reply}</p>
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
