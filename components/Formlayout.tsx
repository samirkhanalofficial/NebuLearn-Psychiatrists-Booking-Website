import style from "../styles/Login.module.css";
import Image from "next/image";
export default function Login({
  image,
  children,
}: {
  image: string;
  children: JSX.Element;
}) {
  return (
    <>
      <div className={style.mainForm}>
        <div className={style.loginSide}>
          <div className={style.logo}></div>
          {children}
          <br />
          <br />
        </div>
        <div className={style.imageSide}>
          <Image
            alt="hero-image"
            width={"400"}
            height={"400"}
            className={style.image}
            src={image}
            blurDataURL={image}
            placeholder={"blur"}
          />
        </div>
      </div>
    </>
  );
}
