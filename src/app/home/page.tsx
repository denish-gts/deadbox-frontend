"use client";

// import { post } from "@/api/base";
import Footer from "@/component/Footer/Footer";
import Header from "@/component/header/Header";
import Tabs from "@/component/home/tab";
// import { errorCheckAPIResponse } from "@/utils/helpers";
// import { useEffect, useState } from "react";

export default function Home() {
  // const [userData, setuserData] = useState({});  

  // useEffect(() => {
  //   post(`user/get-profile`)
  //   .then((res) => {      
  //     setuserData(res?.data?.data);
  //       // setIsLoading(false)
  //   })
  //   .catch((error) => {
  //       errorCheckAPIResponse(error);
  //       // setIsLoading(false)
  //   }); 
  // }, []);
  return (
    <div>
      <Header />
      <div className="">
        <Tabs />
      </div>
      <Footer />
    </div>
  );
}
