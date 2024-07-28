"use client";
import { useRouter, useSearchParams } from 'next/navigation'
import Login from "./login/page";
import Signup from "./signup/page";

export default function Home() {
  const authToken = JSON.parse(localStorage.getItem("userDetails"));
  const router = useRouter();
  if (authToken?.token) {
    router.push("/home");
  }
  return (
    <>
      <Signup />
    </>
  );
}
