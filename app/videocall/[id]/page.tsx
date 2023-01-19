import { redirect } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
const VideoCallScreen = dynamic(() => import("./VideoCallScreen"), {
  ssr: false,
});
async function getUserDetails(params: any) {
  console.log("params:" + params);
  //   const { id, token } = params;
  //   const res = await fetch("https://codestorm.samirk.com.np/api/videocall", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       id: id,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: token || "",
  //     },
  //   });
  //   if (res.status != 200) return redirect("/");
  //   const data = await res.json();
  //   return data;
}
export default async function Page({ params, searchParams }: any) {
  console.log("search params: " + searchParams.toString());
  const data = await getUserDetails({
    id: params.id,
    token: searchParams.token,
  });
  return (
    // <VideoCallScreen
    //   meetingId={data.meetingId}
    //   partnerId={data.partnerId}
    //   myId={data.myId}
    //   meeting={data.meeting}
    // />
    <>testing</>
  );
}
