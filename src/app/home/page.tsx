"use client";

import { BASE_URL } from "@/api/base";
import Footer from "@/component/Footer/Footer";
import Header from "@/component/header/Header";
import Tabs from "@/component/home/tab";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setuserData] = useState(null);
  const router = useRouter();
  const token = JSON.parse(localStorage.getItem("userDetails")).token;
  if (!token) {
    router.push("/login");
  }
  useEffect(() => {
    Promise.all([
      fetch(`${BASE_URL}/user/get-profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res: any) => res.json()),
    ]).then((data: any) => {
      console.log(data[0]);
      setuserData(data[0].data);
    });
  }, []);
  return (
    <div>
      <Header userData={userData} setuserData={setuserData} />
      <div className="">
        <Tabs userData={userData} setuserData={setuserData} />
      </div>
      <Footer />
    </div>
  );
}
