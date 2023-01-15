import Script from "next/script";
import React, { useEffect } from "react";

export default function VideoCall() {
  useEffect(() => {}, []);
  return (
    <div className="videoCall">
      <div className="screen myScreen"></div>
      <div className="screen remoteScreen"></div>
    </div>
  );
}
