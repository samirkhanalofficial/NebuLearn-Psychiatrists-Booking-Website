import Nav from "@/components/Nav";
import React from "react";
import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div>
      <Nav route="loading" />
      <div
        style={{
          display: "flex",
          height: "90vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ScaleLoader color="#03c4ff" />
      </div>
    </div>
  );
}
