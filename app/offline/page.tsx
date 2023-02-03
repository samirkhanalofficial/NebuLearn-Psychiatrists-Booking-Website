import HeroSection from "@/components/HeroSection";
import Nav from "@/components/Nav";
import React from "react";

export default function Page() {
  return (
    <>
      <head>
        <title>offline - CodeStorm</title>
      </head>
      <h2
        style={{
          color: "#03c4ff",
        }}
      >
        Oops!
      </h2>
      <p>
        It seems like we are having issue connecting to the server.
        <br />
        This may happen either due to inter connection or server problem. <br />
        Please recheck your internet connection.
      </p>
    </>
  );
}
