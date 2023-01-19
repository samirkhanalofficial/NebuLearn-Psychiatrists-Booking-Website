"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/loading";
const VideoCallScreen = dynamic(() => import("./VideoCallScreen"), {
  ssr: false,
});

export default function Page({ params }: any) {
  const [data, setData] = useState<any>();
  let firstTime = 0;
  async function getUserDetails() {
    const token = await localStorage.getItem("token");
    const Psytoken = await localStorage.getItem("PsyToken");
    const res = await fetch("/api/videocall", {
      method: "POST",
      body: JSON.stringify({
        id: params.id,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token! || Psytoken!,
      },
    });
    const dataa = await res.json();
    setData(dataa);
  }
  useEffect(() => {
    if (firstTime == 0) {
      getUserDetails();
      firstTime++;
    }
  }, []);
  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <VideoCallScreen
          meetingId={data!.meetingId!}
          partnerId={data!.partnerId!}
          myId={data!.myId!}
          meeting={data!.meeting!}
        />
      )}
    </>
  );
}
