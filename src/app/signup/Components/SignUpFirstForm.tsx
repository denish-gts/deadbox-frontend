import { axiosInstance } from "@/api/base";
import { setToken, setUserInfo } from "@/utils/auth.util";
import { errorCheckAPIResponse, successAPIResponse } from "@/utils/helpers";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import styles from "./signupForm.module.scss";

const MailIcon = "/assets/icons/mail-icon.svg";
const SendLinkIcon = "/assets/icons/send-link-icon.svg";
const GoogleIcon = "/assets/icons/google-icon.svg";
const UserIcon = "/assets/images/1.png";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/signin1.jpg";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required."),
  last_name: Yup.string().required("Last Name is required."),
  country_code: Yup.string().required("Country code is required."),
  mobile_no: Yup.number().typeError('Please enter numbur value.')
    .positive('Must be a positive number.').required("Mobile no is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
});
export default function SignUpFirstForm({
  setFirstOpen,
  inputData,
  setinputData,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { handleSubmit, values, touched, errors, handleChange, setValues } =
    useFormik({
      initialValues: {
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
        country_code: "",
        mobile_no: "",
        over13: "",
        privacyPolicy: false,
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        setinputData(values);
        setFirstOpen(false);
      },
    });

  useEffect(() => {
    if (values.over13 == "yes" && values.privacyPolicy) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }

  }, [values]);
  useEffect(() => {
    if (inputData) {
      setValues({ ...inputData });
    }
  }, [inputData])


  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setAvatar(upload.target.result);
      };
      reader.readAsDataURL(file);
      setValues({ ...values, avatar: file });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.signupSection}>
        <div className={styles.formContainer}>
          <div className={styles.logo}>
            <Image src={Logo} alt="Logo" unoptimized height={0} width={0} />
          </div>
          <h2>Signup</h2>
          <div className={styles.avatarContainer}>
            <div
              className={styles.avatar}
              onClick={() => document.getElementById("avatarInput").click()}
            >
              {avatar ? (
                <img src={avatar} alt="Avatar" />
              ) : (
                <img src={UserIcon} alt="User Icon" />
              )}
              <div className={styles.plusIcon}>+</div>
            </div>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div>
          {/* <div className={styles.avatar}>
          <i className={styles.icon}></i>
        </div> */}

          <div className={styles.form}>
            <div className={styles.twoGrid}>
              <div>

                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onChange={handleChange}
                  value={values.first_name}
                />
                {errors.first_name && touched.first_name ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "-10px",
                      marginBottom: "16px",
                    }}
                  >
                    {errors.first_name}
                  </p>
                ) : null}
              </div>
              <div>

                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={handleChange}
                  value={values.last_name}
                />
                {errors.last_name && touched.last_name ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "-10px",
                      marginBottom: "16px",
                    }}
                  >
                    {errors.last_name}
                  </p>
                ) : null}
              </div>
            </div>
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
            <select
              name="country_code"
              onChange={handleChange}
              value={values.country_code}
            >
              <option value="">Select Country Code</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            {errors.country_code && touched.country_code ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                {errors.country_code}
              </p>
            ) : null}
            <input
              type="tel"
              placeholder="Phone Number"
              name="mobile_no"
              onChange={handleChange}
              value={values.mobile_no}
            />
            {errors.mobile_no && touched.mobile_no ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                {errors.mobile_no}
              </p>
            ) : null}
            <div className={styles.radiogroup}>
              <span>Are you over 13?</span>
              <div className={styles.flex}>
                <input type="radio" onChange={() => {
                  setValues({ ...values, over13: "yes" });
                }}
                  id="yes"
                  name="age"
                  value="yes" />
                <label htmlFor="yes">Yes</label>
                <input type="radio" id="no"
                  onChange={() => {
                    setValues({ ...values, over13: "no" });
                  }}
                  name="age"
                  value="no" />
                <label htmlFor="no">No</label>
              </div>
            </div>

            <div className={styles.checkboxContainer}>
            <label className={styles.customcheckbox}>
      <input type="checkbox"  checked={values.privacyPolicy}
                onClick={() => {
                  setValues({
                    ...values,
                    privacyPolicy: !values.privacyPolicy,
                  });
                }}  />
      <span className={styles.checkmark}></span>
    </label>
              {/* <input
                type="checkbox"
                checked={values.privacyPolicy}
                onClick={() => {
                  setValues({
                    ...values,
                    privacyPolicy: !values.privacyPolicy,
                  });
                }}
                id="policy"
              /> */}
              <label htmlFor="policy" className={styles.labelAlignment}>
                I have read and understood the{" "}
                {/* <a href="/privacy-policy"> */}
                Privacy Policy
                {/* </a> */}
              </label>
            </div>
            {isLoading ? (
              <>
                <button style={{ backgroundColor: "#9e9e9e" }} type="button">
                  Next Step
                </button>
              </>
            ) : (
              <button type="submit">Next Step</button>
            )}
          </div>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image src={BG} alt="Background" unoptimized height={0} width={0} />
        </div>
      </div>
    </form>
  );
}
