import Nav from "@/components/admins/Nav";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  return (
    <div>
      <Nav route="psychiatrists" />
      Psychiatrists
    </div>
  );
}
