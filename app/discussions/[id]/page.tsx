"use client";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "@/styles/Discussion.module.css";
import Loading from "@/components/loading";
import NoResult from "@/components/NoResult";
type commentType = { reply: string; email: string; _id: string };
type discussionType = {
  email: string;
  question: string;
  _id: string;
  comment: commentType[];
};
export default function Discussions({ params }: any) {
  const [query, setQuery] = useState("");
  const [isloading, setloading] = useState(true);

  const [isPosting, setposting] = useState(false);

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
      setloading(false);
    } else {
      const data = await res.json();
      setcomments(data.comment);
      setloading(false);
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
      <head>
        <title>Comments</title>
      </head>
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
              setposting(true);
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
                setposting(false);

                toast.error("Error posting Comment");
              } else {
                const data: commentType = await res.json();
                console.log(data);
                setcomments([
                  { reply: query, email: "me", _id: "62gvb" },
                  ...comment,
                ]);
                toast.success("Comment Added Successfully");
                setQuery("");
                setposting(false);
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
            {isPosting ? <Loading /> : <button>Coment</button>}
          </form>
        </div>
        <div className={style.discussions}>
          <h2>
            Recents Comments: <br />
            <br />
          </h2>
          {isloading ? (
            <Loading />
          ) : comment.length <= 0 ? (
            <NoResult item="Coments" />
          ) : (
            comment.map((com) => (
              <>
                <div key={com._id} className={style.discussion}>
                  <b>{com.email}</b>
                  <br />
                  <br />
                  <p>{com.reply}</p>
                </div>
              </>
            ))
          )}
        </div>
      </div>
      <div>
        <div className={style.dommy}>{""}</div>
        <Footer />
      </div>
    </>
  );
}
