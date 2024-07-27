"use client";

import { useRouter } from "next/navigation";
import styles from "./login.module.scss";
import LoginForm from "./Components/loginForm";
const SendLinkIcon = "/assets/icons/send-link-icon.svg";
export default function Login() {
  return (
    <>
      <div>
        <LoginForm/>
      </div>
    </>
  );
}
