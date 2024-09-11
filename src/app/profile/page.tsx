
import Myprofile from "@/component/home/Myprofile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};
export default function Profile() {

  return (
    <Myprofile />
  );
}
