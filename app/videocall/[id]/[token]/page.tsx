import { redirect } from "next/navigation";
import React from "react";
import VideoCallScreen from "./VideoCallScreen";
export async function getUserDetails({ params }: any) {
  // http://localhost:3000/videocall/testid/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzhlN2EwZWVhZjU1MTNkNDBkYmM0MyIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsImxvZ2luQXQiOiJUaHUgSmFuIDE5IDIwMjMgMTI6MzM6MTMgR01UKzA1NDUgKE5lcGFsIFRpbWUpIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzQxMTA4OTMsImV4cCI6MTY3NDQ3MDg5M30.yhnzQv5FXXtgV45uwnJ4GcftcfOsPAr9PX0k1axWtb8
  const { id, token } = params.params;
  const res = await fetch("http://localhost:3000/api/videocall", {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: token || "",
    },
    cache: "no-store",
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
