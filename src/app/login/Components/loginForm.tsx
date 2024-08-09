'use client'
import React, { useEffect, useState } from "react";
import styles from "./loginForm.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { setToken, setUserInfo } from "@/utils/auth.util";
import { axiosInstance, BASE_URL } from "@/api/base";
import { errorCheckAPIResponse, successAPIResponse } from "@/utils/helpers";
// import Loader from "@/component/loader";
import { useRouter } from "next/navigation";
import { resolve } from "styled-jsx/macro";
const MailIcon = "/assets/icons/mail-icon.svg";
const SendLinkIcon = "/assets/icons/send-link-icon.svg";
const GoogleIcon = "/assets/icons/google-icon.svg";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/bg1.png";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
});

export default function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, values, touched, errors, handleChange, setValues } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        const apiData = new FormData();

        apiData.append("email", values.email);

        axiosInstance
          .post(`auth/send-magic-link`, apiData)
          .then((res) => {
            if (res?.data?.data?.is_user_registered) {
              router.push('/magic')
              const res = {
                data:
                  { message: 'Magic link has been sent. Please check your inbox.' }
              }
              successAPIResponse(res);
            } else {
              let error = {
                response: { data: { message: "You are not registered." } },
              };
              errorCheckAPIResponse(error);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            errorCheckAPIResponse(error);
          });
      },
    });

  return (
    <div className={styles.signupSection}>
      <div className={styles.formContainer}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && touched.email ? (
            <p
              style={{
                color: "red",
                fontSize: "12px",
                marginTop: "-10px",
                marginBottom: "16px",
              }}
            >
              {errors.email}
            </p>
          ) : null}
          {isLoading ? (
            <button style={{ backgroundColor: "#9e9e9e" }} type="button">
              Submit
            </button>
          ) : (
            <button type="submit">Send Magic Link</button>
          )}
          <p style={{ marginTop: '10px' }} className={styles.center}>
            Create an account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
      <div className={styles.imageContainer}>
        <Image src={BG} alt="Background" unoptimized height={0} width={0} />
      </div>
    </div>
  );
}
