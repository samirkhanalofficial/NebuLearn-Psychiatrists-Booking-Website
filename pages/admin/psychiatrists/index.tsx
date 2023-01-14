import Nav from "@/components/admins/Nav";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "../../../styles/Psychiatrist.module.css";
export default function Dashboard() {
  return (
    <div>
      <Nav route="psychiatrists" />
      <div className="row">
        <h2>Psychiatrists</h2>
        <Link
          href="/admin/psychiatrists/create"
          className={style.addPsychiatrist}
        >
          Add new
        </Link>
      </div>
    </div>
  );
}
