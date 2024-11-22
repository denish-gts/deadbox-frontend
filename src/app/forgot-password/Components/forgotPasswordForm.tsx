'use client'
import React, { useState } from "react";
import styles from "./forgotPasswordForm.module.scss";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/api/base";
import { errorCheckAPIResponse } from "@/utils/helpers";
import Loader from "@/component/common/loader";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/bg1.png";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
});

const validationSchema1 = Yup.object().shape({
  password: Yup.string().required("Password is required."),
  reset_password_token: Yup.string().required("OTP is required."),

});

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Number>(1)
  console.log('stepstepstepstepstepstep', step);

  const { handleSubmit, values, touched, errors, handleChange } =
    useFormik({
      initialValues: step === 1 ? {
        email: "",
      } : {
        reset_password_token: '',
        password: ''
      },
      validationSchema: step === 1 ? validationSchema:validationSchema1,
      onSubmit: (values) => {
        setIsLoading(true);
        if (step === 1) {
          axiosInstance
            .post(`auth/forgot-password`, values)
            .then((res) => {
              setStep(2)
              toast.success(res.data.data)
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              errorCheckAPIResponse(error);
            });
        } else {
          axiosInstance
            .post(`auth/reset-password`, values)
            .then((res) => {
              toast.success(res.data.data)
              router.push('/firm-list')
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              errorCheckAPIResponse(error);
            });
        }
      }
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
        <h2>Forgot Password</h2>
        {step === 1 && (
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
            {/* {isLoading ? (
            <button style={{ backgroundColor: "#9e9e9e" }} type="button">
              Submit
            </button>
          ) : ( */}
            <button type="submit">Send OTP</button>
            <p style={{ marginTop: '10px' }} className={styles.center}>
            Already have an account? <a href="/login">Login</a>
            </p>
            {/* )} */}
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="OTP"
              name="reset_password_token"
              onChange={handleChange}
              value={values.reset_password_token}
            />
            {errors.reset_password_token && touched.reset_password_token ? (
              <p className={styles.error_content}
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}>
                {errors.reset_password_token}
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
            {/* {isLoading ? (
            <button style={{ backgroundColor: "#9e9e9e" }} type="button">
              Submit
            </button>
          ) : ( */}
            <button type="submit">{step == 1 ? 'Send OTP' : 'Submit'}</button>
            {/* )} */}
            <p style={{ marginTop: '10px' }} className={styles.center}>
            Already have an account? <a href="/login">Login</a>
            </p>
          </form>

        )}
      </div>
      <div className={styles.imageContainer}>
        <Image src={BG} alt="Background" unoptimized height={0} width={0} />
      </div>
    </div>
  );
}
