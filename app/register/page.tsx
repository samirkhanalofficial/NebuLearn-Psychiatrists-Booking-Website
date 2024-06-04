"use client";

import Link from "next/link";
import style from "@/styles/Login.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import FormLayout from "@/components/Formlayout";
import Nav from "@/components/Nav";
import head from "next/head";
import Loading from "@/components/loading";
export type userType = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  date: string;
};
export default function Register() {
  const [showPassword, setshowPassword] = useState(false);
  const passwordType = showPassword ? "text" : "password";
  function changePasswordVisibility() {
    setshowPassword(!showPassword);
  }
  async function RegisterNow(event: any) {
    event.preventDefault();
    try {
      setloading(true);
      var user = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          fullName: userName,
          email: userEmail,
          password: userPassword,
          age: age,
          confirmPassword: userConfirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (user.status != 200) {
        const userData: { message: string } = await user.json();
        toast.error(userData.message!);
        setloading(false);
      } else {
        const userData: userType = await user.json();
        toast.success("Registered Successfully");
        setUserInfo([userData, ...userInfo]);
        setUserName("");
        setUserEmail("");
        setUserPassword("");
        setAge("");
        setUserConfirmPassword("");
      }
    } catch (e: any) {
      toast.error(e);
    } finally {
      setloading(false);
    }
  }
  const [userInfo, setUserInfo] = useState<userType[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>("");
  const [loading, setloading] = useState(false);
  useEffect(() => {}, []);
  const imageReg =
    "https://images.pexels.com/photos/7468236/pexels-photo-7468236.jpeg?auto=compress&cs=tinysrgb&w=1600";
  return (
    <>
      <head>
        <title>Register</title>
      </head>
      <Nav route="" />
      <form action="" onSubmit={async (event) => RegisterNow(event)}>
        <FormLayout image={imageReg}>
          <>
            <div className={style.h1}>
              <h1>Register</h1>
            </div>
            <div>
              <h4 className={style.p}>
                Create an account with us and be mentally fit and fine.
                <br /> Let&apos;s gets started.
              </h4>
              <h4 className={style.paraMobile + " " + style.p}>
                Let&apos;s get started.
              </h4>
            </div>
            <div className={style.LoginContent}>Full Name</div>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className={style.inputField}
                onChange={(event) => setUserName(event.target.value)}
                value={userName}
              />
            </div>
            <div className={style.LoginContent}>Age</div>
            <div>
              <input
                type="number"
                placeholder="Age"
                className={style.inputField}
                onChange={(event) => setAge(event.target.value)}
                value={age}
              />
            </div>
            <div className={style.LoginContent}>Email</div>
            <div>
              <input
                type="email"
                placeholder="Enter your Email"
                className={style.inputField}
                onChange={(event) => setUserEmail(event.target.value)}
                value={userEmail}
              />
            </div>
            <div className={style.LoginContent}>Password</div>
            <div className={style.passwordBox}>
              <input
                type={passwordType}
                placeholder="Enter your Password"
                className={style.inputField}
                onChange={(event) => setUserPassword(event.target.value)}
                value={userPassword}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={changePasswordVisibility}
                  className={style.hidePassowrd}
                />
              ) : (
                <AiFillEye
                  className={style.hidePassowrd}
                  onClick={changePasswordVisibility}
                />
              )}
            </div>
            <div className={style.LoginContent}>Confirm Password</div>
            <div className={style.passwordBox}>
              <input
                type={passwordType}
                placeholder="Confirm Password"
                className={style.inputField}
                onChange={(event) => setUserConfirmPassword(event.target.value)}
                value={userConfirmPassword}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={changePasswordVisibility}
                  className={style.hidePassowrd}
                />
              ) : (
                <AiFillEye
                  className={style.hidePassowrd}
                  onClick={changePasswordVisibility}
                />
              )}
            </div>
            {loading ? (
              <>
                <Loading />
              </>
            ) : (
              <button className={style.loginButton}>Create Account</button>
            )}
            <span className="test">
              Already have an account ?
              <Link className={style.forPass} href={"/login"}>
                <b> Login Here</b>
              </Link>
            </span>
          </>
        </FormLayout>
      </form>
    </>
  );
}
