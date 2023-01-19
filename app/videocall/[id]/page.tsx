import { redirect } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
const VideoCallScreen = dynamic(() => import("./VideoCallScreen"), {
  ssr: false,
});
async function getUserDetails(params: any) {
  const { id, token } = params;
  console.log(params);
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
export default async function Page({ params, searchParams }: any) {
  const data = await getUserDetails({
    id: params.id,
    token: searchParams.token,
  });
  console.log("search params: " + searchParams);
  return (
    <VideoCallScreen
      meetingId={data.meetingId}
      partnerId={data.partnerId}
      myId={data.myId}
      meeting={data.meeting}
    />
  );
}
