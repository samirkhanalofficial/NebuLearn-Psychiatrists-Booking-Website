import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import style from "../styles/Discussion.module.css";

export default function Discussions() {
  const [discussions, setDiscussions] = useState<
    {
      fullName: string;
      query: string;
      id: string;
    }[]
  >([
    { fullName: "Sumit Ray", query: "How to learn php ?", id: "hsbafhgdfh" },
    { fullName: "Samir Khanal", query: "How to learn php ?", id: "yewgfbhn" },
  ]);
  const [isLoggined, changeLoginnedStatus] = useState(false);
  const router = useRouter();
  useEffect(() => {
    checklogin();
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
          <form action="">
            Queries:
            <textarea
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
              <div key={discussion.id} className={style.discussion}>
                <b>{discussion.fullName}</b>
                <br />
                <br />
                <p>{discussion.query}</p>
                <Link href={"/discussions/" + discussion.id}>Reply</Link>
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
