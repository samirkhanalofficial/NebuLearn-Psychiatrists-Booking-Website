"use client";
import Link from "next/link";
import { useState } from "react";
import style from "@/styles/Login.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import FormLayout from "@/components/Formlayout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Nav from "@/components/Nav";
import head from "next/head";
import Loading from "@/components/loading";

export default function Login() {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  //for fetch api
  const [email, setEmail] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  async function userLogin() {
    setloading(true);
    try {
      setloading(true);

      let result = await fetch("/api/auth", {
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
          await localStorage.setItem("token", loginResult.token);
          toast.success("Login Success");
          setloading(false);
          router.push("/");
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
  const passwordType = showPassword ? "text" : "password";
  function changePasswordVisibility() {
    setshowPassword(!showPassword);
  }
  const imageLogin =
    "https://images.pexels.com/photos/7579315/pexels-photo-7579315.jpeg?auto=compress&cs=tinysrgb&w=1600";

  return (
    <>
      <head>
        <title>Login</title>
      </head>
      <Nav route="" />
      <FormLayout image={imageLogin}>
        <>
          <div className={style.h1}>
            <h1>Login</h1>
          </div>
          <div>
            <h4 className={style.p}>
              Improve your mental health, spirituality and livings with
              NebulaCare
            </h4>
            <h4 className={style.paraMobile + " " + style.p}>
              Improve your mental health, spirituality and livings with
              NebulaCare
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
            Don&apos;t have an account ?
            <Link className={style.forPass} href={"/register"}>
              <b> Create Account Now</b>
            </Link>
          </span>
        </>
      </FormLayout>
    </>
  );
}
