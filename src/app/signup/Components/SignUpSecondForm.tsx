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
import Loader from "@/component/loader";
import { useRouter } from "next/navigation";
import { resolve } from "styled-jsx/macro";
const MailIcon = "/assets/icons/mail-icon.svg";
const SendLinkIcon = "/assets/icons/send-link-icon.svg";
const GoogleIcon = "/assets/icons/google-icon.svg";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/bg1.png";

const validationSchema = Yup.object().shape({
  zip: Yup.string().required("Zipcode is required."),
  about: Yup.string().required("About Us is required."),
  group: Yup.string().required("Group Id is required."),
});
export default function SignUpSecondForm({
  setFirstOpen,
  inputData,
  setinputData,
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { handleSubmit, values, errors, handleChange, setValues } = useFormik({
    initialValues: {
      gender: "",
      country: "",
      zip: "",
      city: "",
      group: "",
      over13: "",
      about: "",
      privacyPolicy: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      const apiData = new FormData();

      if (inputData.avatar) {
        apiData.append("f_image", inputData.avatar);
      }
      apiData.append("first_name", inputData.first_name);
      apiData.append("last_name", inputData.last_name);
      apiData.append("email", inputData.email);
      apiData.append("phone_code", inputData.country_code);
      apiData.append("phone", inputData.mobile_no);
      apiData.append("zipcode", values.zip);
      apiData.append("privacy_policy", "1");
      apiData.append("over_13", "");
      apiData.append("country_title", values.country);
      apiData.append("city_title", values.city);
      apiData.append("gender", values.gender);
      apiData.append("about", values.about);
      apiData.append("group_id", values.group);

      axiosInstance
        .post(`auth/sign-up`, apiData)
        .then((res) => {
          console.log(res);
          successAPIResponse(res);
          //   setIsMagicLink(true);
          const body = {
            email: inputData.email,
          };
          const magicApiData = new FormData();
          magicApiData.append("email", inputData.email);
          axiosInstance.post(`auth/send-magic-link`, magicApiData).then((res) => {
            console.log(res, "magic");
            successAPIResponse(res);
            setIsLoading(false);
          });
        })
        .catch((error) => {
          errorCheckAPIResponse(error);
          setIsLoading(false);
        });
    },
  });
  const router = useRouter();
  // useEffect(() => {
  //   if (session && Object.keys(session).length > 0) {
  //     setIsLoading(true);
  //     const fullname = session?.user?.name;
  //     const body = {
  //       email: session?.user?.email,
  //       first_name: fullname.split(" ")[0],
  //       last_name: fullname.split(" ")[1],
  //     };
  //     axiosInstance
  //       .post(`/auth/authorize`, body)
  //       .then((res) => {
  //         setToken(res.data.access_token);
  //         setUserInfo(res.data.data);
  //         router.push(`/dashboard`);
  //         setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         errorCheckAPIResponse(error);
  //         setIsLoading(false);
  //       });
  //   }
  // }, [session]);

  useEffect(() => {
    if (values.over13 == "yes" && values.privacyPolicy) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [values]);

  const handleGoogleSignIn = async () => {
    signIn("google");
  };
  // const handleClickSendMegiclink = () => {
  //   formik.handleSubmit();
  // };
  return (
    <div className={styles.signupSection}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <Image src={Logo} alt="Logo" unoptimized height={0} width={0} />
        </div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <select onChange={handleChange} name="gender" value={values.gender}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select onChange={handleChange} name="country" value={values.country}>
            <option value="">Country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
          <div className={styles.inlineInputs}>
            <input
              type="text"
              placeholder="City"
              onChange={handleChange}
              name="city"
              value={values.city}
            />
            <input
              type="text"
              placeholder="Zipcode"
              onChange={handleChange}
              name="zip"
              value={values.zip}
            />
            <p
              style={{
                color: "red",
                fontSize: "12px",
                marginTop: "-10px",
                marginBottom: "16px",
              }}
            >
              {errors.zip}
            </p>
          </div>
          <textarea
            placeholder="About me"
            onChange={handleChange}
            name="about"
            value={values.about}
          ></textarea>
          <p
            style={{
              color: "red",
              fontSize: "12px",
              marginTop: "-10px",
              marginBottom: "16px",
            }}
          >
            {errors.about}
          </p>
          <select onChange={handleChange} name="group" value={values.group}>
            <option value="">Select Group</option>
            <option value="2,5,6">Group 1</option>
            <option value="2,5,6">Group 2</option>
          </select>
          <p
            style={{
              color: "red",
              fontSize: "12px",
              marginTop: "-10px",
              marginBottom: "16px",
            }}
          >
            {errors.group}
          </p>
          <div className={styles.inlineRadios}>
            <label>Are you over 13?</label>
            <div>
              <input
                type="radio"
                onChange={() => {
                  setValues({ ...values, over13: "yes" });
                }}
                id="yes"
                name="age"
                value="yes"
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="no"
                onChange={() => {
                  setValues({ ...values, over13: "no" });
                }}
                name="age"
                value="no"
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={values.privacyPolicy}
              onClick={() => {
                setValues({ ...values, privacyPolicy: !values.privacyPolicy });
              }}
              id="policy"
            />
            <label htmlFor="policy">
              I have read and understood the{" "}
              <a href="/privacy-policy">Privacy Policy</a>
            </label>
          </div>
          {isLoading ? (
            <button style={{ backgroundColor: "#9e9e9e" }} type="button">
              Submit
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </form>
      </div>
      <div className={styles.imageContainer}>
        <Image src={BG} alt="Background" unoptimized height={0} width={0} />
      </div>
    </div>
  );
}
