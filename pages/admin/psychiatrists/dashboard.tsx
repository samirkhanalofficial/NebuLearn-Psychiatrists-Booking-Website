import NameCard from "@/components/NameCard";
import React from "react";

export default function dashboard() {
  return (
    <div>
      <NameCard
        src="/public/user.png"
        name="Sumit Ray"
        age={23}
        date="2023/01/15"
        time="10:25"
      />
    </div>
  );
}
