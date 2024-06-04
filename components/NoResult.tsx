"use client";

import React from "react";
import Image from "next/image";
export default function NoResult({ item }: { item: string }) {
  return (
    <>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "10px",
        }}
      >
        <Image alt="error" src="/not-found.webp" width={300} height={300} />
        <h2>No {item} Found</h2>

        <br />
        <br />
      </div>
    </>
  );
}
