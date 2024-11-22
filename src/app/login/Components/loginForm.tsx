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
import Loader from "@/component/common/loader";
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
  password: Yup.string().required("Password is required."),

});

export default function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, values, touched, errors, handleChange, setValues } =
    useFormik({
      initialValues: {
        email: "",
        password: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setIsLoading(true);

        axiosInstance
          .post(`auth/sign-in`, values)
          .then((res) => {
            if (res.data.data.signup_complete_status == 1) {
              setToken(res.data.data.token)
              setUserInfo(res.data.data)
              router.push(`/profile`);
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
      {isLoading && (
        <Loader />
      )}
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <Image src={Logo} alt="Logo" unoptimized height={0} width={0} />
        </div>
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
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && touched.password ? (
            <p className={styles.error_content}
            style={{
              color: "red",
              fontSize: "12px",
              marginTop: "-10px",
              marginBottom: "16px",
            }}>
              {errors.password}
            </p>
          ) : null}
          <p className={styles.forgotPassword}>
            <a href="/forgot-password">Forgot your Password ?</a>
          </p>
          {isLoading ? (
            <button style={{ backgroundColor: "#9e9e9e" }} type="button">
              Submit
            </button>
          ) : (
            <button type="submit">Signin</button>
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
