"use client";

import Nav from "@/components/Nav";
import React from "react";
import head from "next/head";
import Image from "next/image";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
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
        <h2>Error : Something went wrong</h2>
        <br />
        Opps! something went wrong. this may happend either due to internet
        error or some internal problems. Please report us.
      </div>
    </>
  );
}
