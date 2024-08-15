import type { Metadata } from "next";
import SignupContent from "./singupContent";

export const metadata: Metadata = {
  title: "Singup",
};

export default function Singup() {
  return (
    <>
      <div>
        <SignupContent/>
      </div>
    </>
  );
}
