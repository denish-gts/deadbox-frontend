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
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/bg1.png";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
});

const validationSchema1 = Yup.object().shape({
  reset_password_token: Yup.string().required("OTP is required."),

});
const validationSchema2 = Yup.object().shape({
  password: Yup.string().required("Password is required."),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),

});
export default function ForgotPasswordForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Number>(1)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { handleSubmit, values, touched, errors, handleChange } =
    useFormik({
      initialValues:
      {
        email: "",
        reset_password_token: '',
        password: '',
        confirm_password: ''
      },
      validationSchema: step === 1 ? validationSchema : step === 2 ? validationSchema1 : validationSchema2,
      onSubmit: (values) => {
        setIsLoading(true);
        if (step === 1) {
          axiosInstance
            .post(`auth/forgot-password`, { email: values.email })
            .then((res) => {
              setStep(2)
              toast.success(res.data.data)
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              errorCheckAPIResponse(error);
            });
        } else if (step === 2) {
          axiosInstance
            .post(`auth/verify-reset-password-token`, { reset_password_token: values.reset_password_token })
            .then((res) => {
              setStep(3)

              toast.success('OTP verify.')
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              errorCheckAPIResponse(error);
            });
        } else if (step === 3) {
          axiosInstance
            .post(`auth/reset-password`, { email: values.email, password: values.password })
            .then((res) => {
              toast.success(res.data.data)
              router.push('/login')
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
        <h2>{step === 1 ? 'Forgot Password' : step === 2 ? 'Verify OTP' : 'Reset Password'}</h2>
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
            <button type="submit">Send OTP</button>
            <p style={{ marginTop: '10px' }} className={styles.center}>
              Already have an account? <a href="/login">Login</a>
            </p>
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

            <button type="submit">{'Verify OTP'}</button>
            <p style={{ marginTop: '10px' }} className={styles.center}>
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>

        )}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <div className={styles.passwordField}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
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
            <div className={styles.passwordField}>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirm_password"
                onChange={handleChange}
                value={values.confirm_password}
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirm_password && touched.confirm_password ? (
              <p className={styles.error_content}
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}>
                {errors.confirm_password}
              </p>
            ) : null}
            <button type="submit">{'Submit'}</button>
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
