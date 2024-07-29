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
  const token = JSON.parse(localStorage.getItem("userDetails"));
  if (!token?.token) {
    router.push("/login");
  }
  useEffect(() => {
    Promise.all([
      fetch(`${BASE_URL}/user/get-profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }).then((res: any) => res.json()),
    ]).then((data: any) => {
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
