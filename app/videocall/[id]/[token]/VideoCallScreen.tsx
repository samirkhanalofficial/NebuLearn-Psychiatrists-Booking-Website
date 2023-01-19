"use client";
import React, { useState } from "react";
import style from "@/styles/videoCall.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import Peer from "peerjs";
export default function VideoCallScreen({
  meetingId,
  partnerId,
  myId,
  meeting,
}: {
  meetingId: string;
  partnerId: string;
  myId: string;
  meeting: any;
}) {
  const peer = new Peer(meetingId + myId);
  peer.on("open", (conn) => {
    console.log("connected peer as " + conn);
  });
  peer.on("call", (call) => {
    setIsCalling(true);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        const myVideo = document.getElementById("myVideo") as HTMLVideoElement;
        myVideo.srcObject = stream;
        myVideo.play();
        myVideo.muted = true;
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          const remoteVideo = document.getElementById(
            "remoteVideo"
          ) as HTMLVideoElement;
          remoteVideo.srcObject = remoteStream;
          remoteVideo.play();
          console.log("playing remote by call");
        });
      });
  });
  const [isCalling, setIsCalling] = useState(false);
  function myCall() {
    setIsCalling(true);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        const myVideo = document.getElementById("myVideo") as HTMLVideoElement;
        myVideo.srcObject = stream;
        myVideo.play();
        myVideo.muted = true;
        var call = peer.call(meetingId + partnerId, stream);
        console.log(call);
        call.on("stream", (remoteStream) => {
          const remoteVideo = document.getElementById(
            "remoteVideo"
          ) as HTMLVideoElement;
          remoteVideo.srcObject = remoteStream;
          remoteVideo.play();
          console.log("playing remote by button");
        });
      });
  }
  return (
    <div className={style.contents}>
      <div className={style.videoCallScreen}>
        <video id="remoteVideo"></video>
      </div>
      <div className={style.detailScreen}>
        <span className={style.title}>About This Call</span>
        <br />
        <b>Dr Name:</b> <br />
        {meeting.doctorName} <br />
        <b>Client Name:</b> <br />
        {meeting.clientName} <br />
        <b>Client Age:</b>
        {meeting.clientAge} <br />
        <br />
        {isCalling ? (
          <>
            <span className={style.title}>my Video</span>
            <br />
            <video id="myVideo"></video>
          </>
        ) : (
          <>
            <button className={style.makeCall} onClick={() => myCall()}>
              <FaPhoneAlt />
              Make this Call{" "}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
