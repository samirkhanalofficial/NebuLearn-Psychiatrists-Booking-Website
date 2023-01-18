"use client";
import Link from "next/link";
import { useState } from "react";
import style from "@/styles/Login.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import FormLayout from "@/components/Formlayout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import head from "next/head";
import Loading from "@/components/loading";

export default function Login() {
  const router = useRouter();
  //for fetch api
  const [email, setEmail] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  async function userLogin() {
    try {
      setloading(true);
      let result = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (result.status == 200) {
        const loginResult: { token: string } = await result.json();
        if (loginResult.token) {
          console.log(loginResult.token);
          await localStorage.setItem("AdminToken", loginResult.token);
          toast.success("Login Success");
          router.push("/admin/dashboard");
          setloading(false);
        }
        setloading(false);
      } else {
        toast.error("Email or Password you entered is incorrect");
        setloading(false);
      }
    } catch (e: any) {
      toast.error(e.toString());
      setloading(false);
    }
  }
  //for showing and hiding password
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const passwordType = showPassword ? "text" : "password";
  function changePasswordVisibility() {
    setshowPassword(!showPassword);
  }
  const imageLogin =
    "https://images.pexels.com/photos/8297218/pexels-photo-8297218.jpeg?auto=compress&cs=tinysrgb&w=1600";

  return (
    <>
      <head>
        <title>Login</title>
      </head>
      <FormLayout image={imageLogin}>
        <>
          <div className={style.h1}>
            <h1>Admin Login</h1>
          </div>
          <div>
            <h4 className={style.p}>
              Hello Admin, please login for complete access for users and
              doctors.
            </h4>
            <h4 className={style.paraMobile + " " + style.p}>
              Hello Admin, please login for complete access.
            </h4>
          </div>
          <div className={style.LoginContent}>Email</div>
          <div>
            <input
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              className={style.emailBox + " " + style.inputField}
            />
          </div>
          <div className={style.LoginContent}>Password</div>
          <div className={style.passwordBox}>
            <input
              type={passwordType}
              placeholder="Enter your Password"
              className={style.inputField}
              onChange={(e) => SetPassword(e.target.value)}
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
            <button className={style.loginButton} onClick={userLogin}>
              Login
            </button>
          )}

          <span className="test">
            Not an Admin ?
            <Link className={style.forPass} href={"/"}>
              <b> Go to HomePage</b>
            </Link>
          </span>
        </>
      </FormLayout>
    </>
  );
}
