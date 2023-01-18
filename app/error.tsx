"use client";

import Nav from "@/components/Nav";
import React from "react";
import Head from "next/head";
import Image from "next/image";
export default function Error() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
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
