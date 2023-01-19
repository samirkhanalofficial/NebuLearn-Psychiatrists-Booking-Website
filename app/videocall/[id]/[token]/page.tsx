import { redirect } from "next/navigation";
import React from "react";
import VideoCallScreen from "./VideoCallScreen";
async function getUserDetails({ params }: any) {
  const { id, token } = params;
  const res = await fetch("https://codestorm.samirk.com.np/api/videocall", {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: token || "",
    },
  });
  if (res.status != 200) return redirect("/");
  const data = await res.json();
  return data;
}
export default async function Page({
  params,
}: {
  params: { id: string; token: string };
}) {
  const data = await getUserDetails({ params });
  return (
    <VideoCallScreen
      meetingId={data.meetingId}
      partnerId={data.partnerId}
      myId={data.myId}
      meeting={data.meeting}
    />
  );
}
