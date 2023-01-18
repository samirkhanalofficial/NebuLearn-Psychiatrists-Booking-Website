"use client";

import Nav from "@/components/Nav";
import React from "react";
import head from "next/head";
import Image from "next/image";
export default function NotFound() {
  return (
    <>
      <head>
        <title>Page Not Found</title>
      </head>
      <Nav route={""} />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        <Image alt="404 error" src="/404.png" width={300} height={300} />
        <h2>404 : No Page Found!</h2>
        <br />
        Opps! It seems like the page you are looking for doesnot exists.
      </div>
    </>
  );
}
