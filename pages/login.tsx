import Link from "next/link";
import { useState } from "react";
import style from "../styles/Login.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import FormLayout from "../components/Formlayout";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Nav from "@/components/Nav";

export default function Login() {
  const router = useRouter();
  //for fetch api
  const [email, setEmail] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  async function userLogin() {
    try {
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
          router.push("/dashboard");
        }
      } else {
        toast.error("Email or Password you entered is incorrect");
      }
    } catch (e: any) {
      toast.error(e.toString());
    }
  }
  //for showing and hiding password
  const [showPassword, setshowPassword] = useState(false);
  const passwordType = showPassword ? "text" : "password";
  function changePasswordVisibility() {
    setshowPassword(!showPassword);
  }
  const imageLogin =
    "https://images.pexels.com/photos/8297218/pexels-photo-8297218.jpeg?auto=compress&cs=tinysrgb&w=1600";

  return (
    <>
      <Nav route="" />
      <FormLayout image={imageLogin}>
        <>
          <div className={style.h1}>
            <h1>Login</h1>
          </div>
          <div>
            <h4 className={style.p}>
              Plan, organize, and collaborate on any project with powerful task
              management that can be customized for every need.
            </h4>
            <h4 className={style.paraMobile + " " + style.p}>
              Plan, organize, and manage any project
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
          <p className={style.forPass}>
            <b>Forgot Password?</b>
          </p>
          <button className={style.loginButton} onClick={userLogin}>
            Login
          </button>

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
