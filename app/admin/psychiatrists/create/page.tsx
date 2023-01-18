"use client";
import style from "@/styles/Login.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import FormLayout from "@/components/Formlayout";
import Nav from "@/components/admins/Nav";
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
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const passwordType = showPassword ? "text" : "password";
  function changePasswordVisibility() {
    setshowPassword(!showPassword);
  }
  async function RegisterNow(event: any) {
    event.preventDefault();
    const token = await localStorage.getItem("AdminToken");
    setloading(true);
    var user = await fetch("/api/psychiatrists/create", {
      method: "POST",
      body: JSON.stringify({
        fullName: userName,
        email: userEmail,
        password: userPassword,
        age: age,
        amount: price,
        confirmPassword: userConfirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (user.status != 200) {
      const userData: { message: string } = await user.json();
      toast.error(userData?.message!);
      setloading(false);
    } else {
      const userData: userType = await user.json();
      toast.success("Registered Successfully");
      const formData = new FormData();
      formData.append("file", selectedFile!);
      formData.append("upload_preset", "my-upload");
      console.log("userId:" + userData._id);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmybkl5mt/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.status != 200) {
        toast.error("Error uploading image");
        setloading(false);
        return;
      } else {
        const decod = await response.json();
        var res = await fetch(
          "/api/psychiatrists/" + userData._id + "/add-image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: token || "",
            },
            body: JSON.stringify({
              image: decod.url!,
            }),
          }
        );
        if (res.status == 200) {
          toast.error("user Created with image uploading completion");
          setloading(false);
        } else {
          toast.error("Error updating image");
          setloading(false);
        }

        setUserInfo([userData, ...userInfo]);
        setUserName("");
        setUserEmail("");
        setUserPassword("");
        setAge("");
        setUserConfirmPassword("");
        toast.success("psychiatrist Created");
        setloading(false);
      }
      setloading(false);
    }
  }
  const [userInfo, setUserInfo] = useState<userType[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>("");

  useEffect(() => {}, []);
  const imageReg =
    "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=600";
  return (
    <>
      <head>
        <title>Add psychiatrists</title>
      </head>
      <Nav route="psychiatrists" />
      <form action="" onSubmit={async (event) => RegisterNow(event)}>
        <FormLayout image={imageReg}>
          <>
            <div className={style.h1}>
              <h1>Add psychiatrists</h1>
            </div>
            <div className={style.LoginContent}>Full Name</div>
            <div>
              <input
                minLength={8}
                type="text"
                placeholder="Full Name"
                className={style.inputField}
                onChange={(event) => setUserName(event.target.value)}
                value={userName}
              />
            </div>
            <div className={style.LoginContent}>Price</div>
            <div>
              <input
                type="text"
                placeholder="Price"
                className={style.inputField}
                onChange={(event) => setPrice(event.target.value)}
                value={price}
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
            <div className={style.LoginContent}>Image</div>
            <div>
              <input
                type="file"
                placeholder="image"
                className={style.inputField}
                required
                onChange={(event) => {
                  setSelectedFile(event.target.files?.[0]);
                  setIsFilePicked(true);
                }}
              />
            </div>
            {loading ? (
              <Loading />
            ) : (
              <button className={style.loginButton}>Add psychiatrist</button>
            )}
          </>
        </FormLayout>
      </form>
    </>
  );
}
