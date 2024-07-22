"use client";

import { useRouter } from "next/navigation";
import styles from "./login.module.scss";
import LoginForm from "./loginForm";
const Logo = "/assets/logo/logo.svg";
const SendLinkIcon = "/assets/icons/send-link-icon.svg";
export default function Login() {
  const router = useRouter();
  return (
    <>
      <div>
        <LoginForm />
      </div>
    </>
  );
}
