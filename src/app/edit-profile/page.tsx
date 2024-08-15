import EditProfile from "@/component/home/EditProfile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
};
export default function Page() {

  return (
    <EditProfile />
  );
}
