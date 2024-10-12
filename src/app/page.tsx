import Signup from "./signup/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Singup",
};

export default function Page() {

  return (
    <>
      <Signup />
    </>
  );
}
