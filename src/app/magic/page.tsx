"use client"

import { useRouter } from "next/navigation"
import styles from "./magic.module.scss";
import Image from "next/image";
const Logo = "/assets/logo/logo.jpeg";
const SendLinkIcon = "/assets/icons/send-link-icon.svg";
export default function Magic() {
    const router = useRouter();
    return (
        <>
          Magic
        </>
    )
}