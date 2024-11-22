import type { Metadata } from "next";
import ForgotPasswordForm from "./Components/forgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPassword() {
  return (
    <>
      <div>
        <ForgotPasswordForm/>
      </div>
    </>
  );
}
