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
import { MultiSelect } from "react-multi-select-component";
const MailIcon = "/assets/icons/mail-icon.svg";
const SendLinkIcon = "/assets/icons/send-link-icon.svg";
const GoogleIcon = "/assets/icons/google-icon.svg";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/signin2.jpg";

const validationSchema = Yup.object().shape({
  zip: Yup.string().required("Zipcode is required."),
  about: Yup.string().required("About Us is required."),
  gender: Yup.string().required("Zipcode is required."),
  country: Yup.string().required("About Us is required."),
  city: Yup.string().required("About Us is required."),
  sign: Yup.string().required("About Us is required."),
  dob: Yup.string().required("About Us is required."),
  group: Yup.array()
    .required("Group Id is required.")
    .min(1, "Group Id is required."),
});
const CustomMultiSelect = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className={styles.custommultiselect}>
      <div className={styles.selectbox} onClick={handleToggle}>
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Select options"}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className={styles.optionscontainer}>
          {options.map((option) => (
            <div className={styles.option} key={option.value}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleOptionChange(option.value)}
                />
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SignUpSecondForm({
  setFirstOpen,
  inputData,
  setinputData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [groupOption, setGroupOption] = useState([
    { label: "Group 1", value: "group1" },
    { label: "Group 2", value: "group2" },
    { label: "Group 3", value: "group3" },
  ]);

  const { handleSubmit, values, touched, errors, handleChange, setValues } =
    useFormik({
      initialValues: {
        gender: "",
        country: "",
        zip: "",
        city: "",
        group: [],
        about: "",
        sign: "",
        dob: "",
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
        apiData.append(
          "group_id",
          values.group.map((item) => item.value).join(",")
        );

        axiosInstance.post(`auth/sign-up`, apiData).then((res) => {
          successAPIResponse(res);
          setIsLoading(false);
        });
      },
    });

  console.log(errors);
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

  // useEffect(() => {
  //   if (values.over13 == "yes" && values.privacyPolicy) {
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(true);
  //   }
  // }, [values]);

  const handleGoogleSignIn = async () => {
    signIn("google");
  };
  // const handleClickSendMegiclink = () => {
  //   formik.handleSubmit();
  // };

  const options = [
    { label: "Grapes", value: "grapes" },
    { label: "Mango", value: "mango" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Watermelon", value: "watermelon" },
    { label: "Banana", value: "banana" },
    { label: "Apple", value: "apple" },
    { label: "Tangerine", value: "tangerine" },
    { label: "Pineapple", value: "pineapple" },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [selected, setSelected] = useState([]);
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
          {errors.gender && touched.gender ? (
            <p
              style={{
                color: "red",
                fontSize: "12px",
                marginTop: "-10px",
                marginBottom: "16px",
              }}
            >
              {errors.gender}
            </p>
          ) : null}
          <select onChange={handleChange} name="country" value={values.country}>
            <option value="">Country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
          {errors.country && touched.country ? (
            <p
              style={{
                color: "red",
                fontSize: "12px",
                marginTop: "-10px",
                marginBottom: "16px",
              }}
            >
              {errors.country}
            </p>
          ) : null}
          <div className={styles.inlineInputs}>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  onChange={handleChange}
                  name="city"
                  value={values.city}
                />
              </div>
              <div>
                {errors.city && touched.city && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "-10px",
                      marginBottom: "16px",
                    }}
                  >
                    {errors.city}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Zipcode"
                  onChange={handleChange}
                  name="zip"
                  value={values.zip}
                />
              </div>
              <div>
                {errors.zip && touched.zip && (
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
                )}
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="sign"
            onChange={handleChange}
            name="Call Sign/Nickname"
            value={values.sign}
          />
          {errors.sign && touched.sign ? (
            <p
              style={{
                color: "red",
                fontSize: "12px",
                marginTop: "-10px",
                marginBottom: "16px",
              }}
            >
              {errors.sign}
            </p>
          ) : null}
          <textarea
            placeholder="About me"
            onChange={handleChange}
            name="about"
            value={values.about}
          ></textarea>
          {errors.about && touched.about ? (
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
          ) : null}
          <CustomMultiSelect
            options={options}
            selectedOptions={selectedOptions}
            onChange={setSelectedOptions}
          />
          {/* <div className={styles.multiselect}> */}
          {/* <MultiSelect
            options={groupOption}
            value={values.group}
            onChange={(selected, value) => {
              setValues({ ...values, group: selected });
            }}
            labelledBy="value"
            />
            </div>
          {errors.group && touched.group ? (
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
          ) : null} */}
          <input
            type="date"
            placeholder="Date of Birth"
            onChange={handleChange}
            name="dob"
            value={values.dob}
          />
          {errors.dob && touched.dob ? (
            <p
              style={{
                color: "red",
                fontSize: "12px",
                marginTop: "-10px",
                marginBottom: "16px",
              }}
            >
              {errors.dob}
            </p>
          ) : null}
          {/* <div className={styles.inlineRadios}>
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
          </div> */}
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
