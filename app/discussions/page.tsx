"use client";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "@/styles/Discussion.module.css";
import Loading from "@/components/loading";
import NoResult from "@/components/NoResult";

export default function Discussions() {
  const [query, setQuery] = useState("");
  const [isloading, setloading] = useState(true);
  const [isPosting, setposting] = useState(false);
  const [discussions, setDiscussions] = useState<
    {
      email: string;
      question: string;
      _id: string;
    }[]
  >([]);
  const router = useRouter();

  async function getData() {
    const token = await localStorage.getItem("token");
    if (!token) return router.push("/login");
    const res = await fetch("/api/discussion/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (res.status != 200) {
      toast.error("Error getting Discussions");
      setloading(false);
    } else {
      const data = await res.json();
      console.log(data);
      setDiscussions(data);
      setloading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <head>
        <title>Discussions</title>
      </head>
      <Nav route="discussions" />
      <div className={style.sections}>
        <div className={style.discussionForm}>
          <form
            action=""
            onSubmit={async (e) => {
              e.preventDefault();
              setposting(true);
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
                const dis = await res.json();
                toast.error(dis.message);
                setposting(false);
              } else {
                toast.success("Query Added Successfully");
                setQuery("");
                const dis = await res.json();
                setDiscussions([dis, ...discussions]);
                setposting(false);
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
            {isPosting ? <Loading /> : <button>Post</button>}
          </form>
        </div>
        <div className={style.discussions}>
          <h2>
            Recents Queries: <br />
            <br />
          </h2>
          {isloading ? (
            <Loading />
          ) : discussions.length <= 0 ? (
            <NoResult item="Discussions" />
          ) : (
            discussions.map((discussion) => (
              <>
                <div key={discussion._id} className={style.discussion}>
                  <b>{discussion.email}</b>
                  <br />
                  <br />
                  <p>{discussion.question}</p>
                  <Link href={"/discussions/" + discussion._id}>Reply</Link>
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
