import Nav from "@/components/admins/Nav";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import style from "../../styles/Discussion.module.css";

type appoinmentType = {
  _id: string;
  client: string;
  doctor: string;
  date: string;
  time: string;
  price: string;
  clientAge: number;
  clientName: string;
  doctorName: string;
  medicines: string[];
  paid: boolean;
  __v: number;
};
export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appoinments, setAppoinments] = useState<appoinmentType[]>([]);
  const router = useRouter();
  async function getMyAppoinments() {
    const token = await localStorage.getItem("AdminToken");
    const testId = await router.query.id;
    var res = await fetch("/api/admin/meetings/", {
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (res.status != 200) {
      toast.error("Error Fetching Data");
    } else {
      const data = await res.json();
      setAppoinments(data);
    }
  }
  async function getUser() {
    const token = await localStorage.getItem("AdminToken");
    if (!token) {
      router.push("/admin/");
    }
    var res = await fetch("/api/my-details/", {
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (res.status != 200) {
      toast.error("Error Fetching Data");
    } else {
      const data = await res.json();
      console.log(data);
      setName(data.fullName);
      setEmail(data.email);
    }
    await getMyAppoinments();
  }
  useEffect(() => {
    getUser();
    getMyAppoinments();
  }, []);

  return (
    <>
      <Head>
        <title>Meetings</title>
      </Head>
      <Nav route="/" />
      <div style={{ padding: "50px" }}></div>
      <div className={style.sections}>
        <div
          style={{
            textAlign: "center",
          }}
          className={style.discussionForm}
        >
          <form action="">
            <FaRegUserCircle
              style={{
                fontSize: "205px",
              }}
            />
            <br />
            <br />
            <h2>Hello Admin:</h2> <br />
            <b>Name:</b> {name}
            <br />
            <br />
            <b>Email: </b>
            {email} <br />
            <button
              onClick={async () => {
                await localStorage.removeItem("token");
                router.push("/");
              }}
            >
              {" "}
              Logout{" "}
            </button>
          </form>
        </div>
        <div className={style.discussions}>
          <h2>
            Appoinments Approvals: <br />
            <br />
          </h2>
          {appoinments.map((appoinment) => (
            <>
              <div
                key={appoinment._id}
                style={{ overflowX: "hidden" }}
                className={style.discussion}
              >
                <b>Client: {appoinment.clientName}</b> <br />(
                {appoinment.client}) <br />
                <b>Dr. {appoinment.doctorName}</b>
                <br />({appoinment.doctor})
                <br />
                <b>{appoinment.date}</b>
                <p>{appoinment.time}</p>
                <br />
                <br />
                <p>Price: Rs. {appoinment.price}</p>
                <p>Reference: {appoinment._id}</p>
                <br />
                {!appoinment.paid ? (
                  <Link
                    className="mybutton"
                    href={"#"}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    onClick={async () => {
                      const token = await localStorage.getItem("AdminToken");
                      var res = await fetch(
                        "/api/admin/meetings/" + appoinment._id + "/verify",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            authorization: token || "",
                          },
                        }
                      );
                      if (res.status != 200) {
                        toast.error("Error Approving Client");
                      } else {
                        toast.success("Client Approved");
                        setAppoinments(
                          appoinments.filter((a) => a._id != appoinment._id)
                        );
                      }
                    }}
                  >
                    Approve
                  </Link>
                ) : (
                  "Aproved payment"
                )}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
