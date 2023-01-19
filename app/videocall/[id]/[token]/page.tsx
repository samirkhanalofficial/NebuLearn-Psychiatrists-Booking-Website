import { redirect } from "next/navigation";
import React from "react";
import VideoCallScreen from "./VideoCallScreen";
async function getUserDetails({ params }: any) {
  const { id, token } = params;
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
  return <>hello</>;
}
