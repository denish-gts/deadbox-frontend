import React, { useEffect, useState } from "react";
import styles from "./loginForm.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { setToken, setUserInfo } from "@/utils/auth.util";
import { axiosInstance, BASE_URL } from "@/api/base";
import { errorCheckAPIResponse, successAPIResponse } from "@/utils/helpers";
// import Loader from "@/component/loader";
import { useRouter } from "next/navigation";
import { resolve } from "styled-jsx/macro";
import { MultiSelect } from "react-multi-select-component";
const MailIcon = "/assets/icons/mail-icon.svg";
const SendLinkIcon = "/assets/icons/send-link-icon.svg";
const GoogleIcon = "/assets/icons/google-icon.svg";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/signin2.jpg";
import Autocomplete from 'react-google-autocomplete';

const validationSchema = Yup.object().shape({
  zip: Yup.string().required("Zipcode is required."),
  about: Yup.string().required("About Us is required."),
  gender: Yup.string().required("Gender is required."),
  country: Yup.string().required("Country Us is required."),
  city: Yup.string().required("City is required."),
  sign_name: Yup.string().required("Sign is required."),
  address1: Yup.string().required("Address is required."),
  // dob: Yup.string().required("Dob is required."),
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
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [groupOption, setGroupOption] = useState([]);
  console.log('groupOptiongroupOption', groupOption);

  useEffect(() => {
    axiosInstance.post('group/list', {
      "group_type": "deadbox",
    }).then((data) => {
      const groupOption = data?.data?.data?.map((item) => {
        return { value: item?.title, id: item?.id, label: item?.title }
      })
      setGroupOption(groupOption)

    }).catch((error) => {
      errorCheckAPIResponse(error)

    })
  }, [])
  const { handleSubmit, values, touched, errors, handleChange, setValues } =
    useFormik({
      initialValues: {
        gender: "",
        country: "",
        zip: "",
        city: "",
        group: [],
        about: "",
        sign_name: "",
        dob: "",
        address1:''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        const apiData = new FormData();

        if (inputData.avatar) {
          apiData.append("f_image", inputData.avatar);
        }
        const groupID = values?.group?.map((item) => {
          const slectedoption = groupOption.find((op) => op.label === item)
          return slectedoption?.id
        })

        apiData.append("first_name", inputData.first_name);
        apiData.append("last_name", inputData.last_name);
        apiData.append("email", inputData.email);
        apiData.append("phone_code", inputData.country_code);
        apiData.append("phone", inputData.mobile_no);
        apiData.append("over_13", 'true');
        apiData.append("privacy_policy", "1");
        apiData.append("zipcode", values.zip);
        apiData.append("country_title", values.country);
        apiData.append("sign_name", values.sign_name);
        apiData.append("address1", values.address1);
        apiData.append("city_title", values.city);
        apiData.append("gender", values.gender);
        apiData.append("about", values.about);
        apiData.append("group_id", groupID.toString() as any);

        axiosInstance.post(`auth/sign-up`, apiData).then((res) => {
          successAPIResponse(res);
          router.push('/magic')

          // const body = { email: inputData.email };
          // axiosInstance
          //   .post(`auth/send-magic-link`, body)
          //   .then((res) => {
          //     // router.push('/magic')
          //     successAPIResponse(res)
          //     setIsLoading(false)
          //   })
          //   .catch((error) => {
          //     errorCheckAPIResponse(error);
          //     setIsLoading(false)
          //   });
          setIsLoading(false);
        }).catch((error) => {
          setIsLoading(false);
          console.log('errorerrorerrorerror', error);

          errorCheckAPIResponse(error)
        });
      },
    });

  return (
    <div className={styles.signupSection}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <Image src={Logo} alt="Logo" unoptimized height={0} width={0} />
        </div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            apiKey="AIzaSyAf0gOA0AoiliWzS8rG5mxBOtqPrM34cjA"
            name="address1"
            onPlaceSelected={(place) => {
              console.log('ggggggg', place, place?.formatted_address, place?.formatted_address?.split(','));
              const option = place?.formatted_address?.split(',')
              let defaultOP = {}
              if (option?.length === 3) {
                defaultOP = {city:option[0],country:option[2],}
              }else if (option?.length === 2) {
                defaultOP = {city:option[0],}
              }else  if (option?.length === 1) {
                defaultOP = {city:option[0]}
              }
              setValues({ ...values, ...defaultOP,address1:place?.formatted_address });
            }}
            //  onChange={(e) => {
            //     formik.setFieldValue('fullAddress', e.target.value);
            //  }}
            //  value={formik.values.fullAddress}
            types={['address']}
            placeholder="Address"
          />
           {
            errors.address1 && touched.address1 ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                {errors.address1}
              </p>
            ) : null
          }
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
          <select onChange={handleChange} name="country" value={values.country}>
            <option value="">Country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
          {
            errors.country && touched.country ? (
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
            ) : null
          }
          <input
            type="text"
            placeholder="Call Sign/Nickname"
            onChange={handleChange}
            name="sign_name"
            value={values.sign_name}
          />
          {
            errors.sign_name && touched.sign_name ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                {errors.sign_name}
              </p>
            ) : null
          }
          <textarea
            placeholder="About me"
            onChange={handleChange}
            name="about"
            value={values.about}
          ></textarea>
          {
            errors.about && touched.about ? (
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
            ) : null
          }
          <CustomMultiSelect
            options={groupOption}
            selectedOptions={values.group}
            onChange={(option) => {
              setValues({ ...values, group: option });
            }}
          />
          {
            errors.group && touched.group ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                Group Id is required.
              </p>
            ) : null
          }
          <input
            type="date"
            placeholder="Date of Birth"
            // onChange={handleChange}
            name="dob"
          // value={values.dob}
          />
          <select onChange={handleChange} name="gender" value={values.gender}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {
            errors.gender && touched.gender ? (
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
            ) : null
          }
          <button style={{ marginBottom: '10px' }} onClick={() => { setFirstOpen(true) }}>Back</button>
          {
            isLoading ? (
              <button style={{ backgroundColor: "#9e9e9e" }} type="button">
                Submit
              </button>
            ) : (
              <button type="submit">Submit</button>
            )
          }
        </form>
      </div>
      <div className={styles.imageContainer}>
        <Image src={BG} alt="Background" unoptimized height={0} width={0} />
      </div>
    </div>
  );
}
