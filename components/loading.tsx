import React from "react";
import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        height: "200px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScaleLoader color="#03c4ff" />
    </div>
  );
}
