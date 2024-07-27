"use client";

import Footer from "@/component/Footer/Footer";
import Header from "@/component/header/Header";
import Tabs from "@/component/home/tab";



export default function Home() {
    return (
        <div>
            <Header />
            <div className="">
            <Tabs />

            </div>
            <Footer />
            
        </div>
    )
}