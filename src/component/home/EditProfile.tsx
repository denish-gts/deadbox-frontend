'use client'
import { Formik, useFormik } from "formik";
import styles from "./home.module.scss";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { post, postFormData } from "@/api/base";
import { errorCheckAPIResponse } from "@/utils/helpers";
import { toast } from "react-toastify";
// import Autocomplete from 'react-google-autocomplete';
import Pencil from "../../../public/assets/images/pencils.png";
import Delete from "../../../public/assets/images/delete.svg";
import Image from "next/image";
import Loader from "../common/loader";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required."),
  last_name: Yup.string().required("Last Name is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
  zipcode: Yup.string().required("Zipcode is required."),
  about: Yup.string().required("About Us is required."),
  phone_code: Yup.string().required("Country code is required."),
  phone: Yup.number().typeError('Please enter numbur value.')
    .positive('Must be a positive number.').required("Mobile no is required."),
  gender: Yup.string().required("Gender is required."),
  country_title: Yup.string().required("Country is required."),
  city_title: Yup.string().required("City is required."),
  sign_name: Yup.string().required("Sign is required."),
  state_title: Yup.string().required("State is required."),
});

export default function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const { handleSubmit, values, touched, errors, handleChange, setValues } =
    useFormik({
      initialValues: {
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
        phone_code: "",
        phone: "",
        gender: "",
        country_title: "",
        zipcode: "",
        city_title: "",
        about: "",
        address: "",
        sign_name: "",
        state_title: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        const apiData = new FormData();

        if (values?.avatar && values?.avatar !== "") {
          apiData.append("f_image", values?.avatar);
        }
        apiData.append("first_name", values?.first_name);
        apiData.append("last_name", values?.last_name);
        apiData.append("email", values?.email);
        apiData.append("phone_code", values?.phone_code);
        apiData.append("phone", values?.phone);
        apiData.append("zipcode", values?.zipcode);
        apiData.append("country_title", values?.country_title);
        apiData.append("city_title", values?.city_title);
        apiData.append("gender", values?.gender);
        apiData.append("about", values?.about);
        apiData.append("address", values?.address);
        apiData.append("sign_name", values?.sign_name);
        apiData.append("state_title", values?.state_title);

        postFormData(`user/update-profile`, apiData)
          .then((res) => {
            setAvatar(null)
            toast.success('User Profile update success.');
            setIsLoading(false);
            getUserData()
          })
          .catch((error) => {
            errorCheckAPIResponse(error);
            setIsLoading(false)
          });
      },
    });

  const getUserData = () => {
    post(`user/get-profile`)
      .then((res) => {
        const resData = res?.data?.data
        setAvatar(resData.image)
        setValues({
          email: resData?.email || "",
          first_name: resData?.first_name || "",
          last_name: resData?.last_name || "",
          avatar: resData.image || '',
          phone_code: resData?.phone_code || "",
          phone: resData?.phone || "",
          gender: resData?.gender || "",
          country_title: resData?.country_title || "",
          zipcode: resData?.zipcode || "",
          city_title: resData?.city_title || "",
          about: resData?.about || "",
          address: resData?.address || "",
          sign_name: resData?.sign_name || "",
          state_title: resData?.state_title || "",
        })
        // setIsLoading(false)
      })
      .catch((error) => {
        errorCheckAPIResponse(error);
        // setIsLoading(false)
      });
  }
  useEffect(() => {
    getUserData()
  }, []);
  const handleZipCodeChange = (e) => {
    const zipcode = e.target.value;
    if (zipcode.length > 4) {
      const body = { "zipcode": zipcode }
      setIsLoading(true)

      post(`common/lookup-zipcode`, body)
        .then((data: any) => {
          const responce = data.data?.data;
          if (responce) {
            const getData = {
              zipcode: zipcode,
              city_title: responce?.city,
              state_title: responce?.state,
              country_title: responce?.country
            }
            setValues({ ...values, ...getData });
          } else {
            const getData = {
              zipcode: zipcode,
              city_title: '',
              state_title: '',
              country_title: ''
            }
            setValues({ ...values, ...getData });
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          errorCheckAPIResponse(error);
        });
    } else {
      const getData = {
        zipcode: zipcode,
        city_title: '',
        state_title: '',
        country_title: ''
      }
      setValues({ ...values, ...getData });
    }

  };
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

  // const onSetAddress = (value) => {
  //   const option = value?.split(',')
  //   let defaultOP: any = {}
  //   if (option?.length === 3) {
  //     setinputData((pre) => {
  //       return { ...pre, address: value, city_title: option[0].trim(), state_title: option[1].trim(), country_title: option[2].trim() }
  //     })
  //     defaultOP = { city_title: option[0].trim(), state_title: option[1].trim(), country_title: option[2].trim(), }
  //   } else if (option?.length === 2) {
  //     setinputData((pre) => {
  //       return { ...pre, address: value, city_title: option[0].trim(), state_title: option[1].trim() }
  //     })
  //     defaultOP = { city_title: option[0].trim(), state_title: option[1].trim() }
  //   } else if (option?.length === 1) {
  //     setinputData((pre) => {
  //       return { ...pre, address: value, city_title: option[0].trim() }
  //     })
  //     defaultOP = { city_title: option[0].trim() }
  //   } else {
  //     setinputData((pre) => {
  //       return { ...pre, address: value }
  //     })
  //   }
  //   setValues({ ...defaultOP, ...{ address: value } });

  // }
  // const handleChangeValue = (e) => {
  //   const { name, value } = e.target
  //   // setinputData((pre) => {
  //   //   return { ...pre, [name]: value }
  //   // })
  //   setValues({ ...values, [name]: value, });
  // }


  return (
    <div className={styles.editProfileContainer}>
      {isLoading && (
        <Loader />
      )}
      <div className={styles.profileFormContainer}>
        <div className={styles.avatarSection}
          onClick={() => document.getElementById("avatarInput").click()}
        >
          <div className={styles.avatar}>
            {avatar ?
              <img src={avatar} alt="Avatar" className={styles.avatarImage} />
              :
              <img src={values?.avatar} alt="Avatar" className={styles.avatarImage} />
            }
            <button
              className={styles.deleteAvatarButton}
              onClick={() => document.getElementById("avatarInput").click()}
            >
              {
                avatar ? <>
                  <Image src={Pencil} alt="Pencil" />
                </> : <>
                  <Image src={Delete} alt="Delete" />

                </>
              }
            </button>
          </div>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => { handleAvatarChange(e) }}
          />
        </div>
        <div className={styles.formSection}>
          <h1 className={styles.header}>Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  value={values?.first_name}
                />
                {errors.first_name && touched.first_name ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.first_name}
                  </p>
                ) : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  value={values?.last_name}
                />
                {errors.last_name && touched.last_name ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.last_name}
                  </p>
                ) : null}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="callSign">Call Sign</label>
                <input
                  type="text"
                  name="sign_name"
                  onChange={handleChange}
                  value={values?.sign_name}
                />
                {errors.sign_name && touched.sign_name ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.sign_name}
                  </p>
                ) : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  value={values?.gender}
                >
                  <option value="female" selected>
                    Female
                  </option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && touched.gender ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.gender}
                  </p>
                ) : null}
              </div>
            </div>
            <div className={styles.formRow}>
              {/* <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  value={values?.phone}
                />
                {errors.phone && touched.phone ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.phone}
                  </p>
                ) : null}
              </div> */}
              <div className={styles.formGroup}>
                <label htmlFor="phoneWithCode">Phone Number</label>
                <div className={styles.phoneInputGroup}>
                  <select
                    name="phone_code"
                    onChange={handleChange}
                    value={values.phone_code}
                    className={styles.phoneCodeSelect}
                  >
                    <option value="">Code</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  <input
                    type="number"
                    name="phone"
                    onChange={handleChange}
                    value={values.phone}
                    className={styles.phoneNumberInput}
                    placeholder="Phone Number"
                  />
                </div>
                {(errors.phone_code && touched.phone_code) || (errors.phone && touched.phone) ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.phone_code || errors.phone}
                  </p>
                ) : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values?.email}
                />
                {errors.email && touched.email ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            {/* <div className={styles.formGroup}>
              <label htmlFor="address">Address</label>
              <Autocomplete
                apiKey="AIzaSyAf0gOA0AoiliWzS8rG5mxBOtqPrM34cjA"
                name="address"
                onPlaceSelected={(place) => {
                  onSetAddress(place?.formatted_address)
                }}
                onChange={(event) => {
                  onSetAddress(event.target.value)
                }}
                onKeyDown={(event) => {
                  if (event.code === "Enter") {
                    onSetAddress(event.target.value)
                  }
                }}

                value={values?.address}
                // types={['address']}
                placeholder="Address"
              />
              {
                errors.address && touched.address ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.address}
                  </p>
                ) : null
              }
            </div> */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="country_title">Country</label>
                <select
                  name="country_title"
                  onChange={handleChange}
                  value={values?.country_title}
                >
                  <option value="">Country</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                </select>
                {errors.country_title && touched.country_title ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.country_title}
                  </p>
                ) : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="state_title">State</label>
                <input
                  type="text"
                  name="state_title"
                  onChange={handleChange}
                  value={values?.state_title}
                />
                {errors.state_title && touched.state_title ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.state_title}
                  </p>
                ) : null}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city_title">City</label>
                <input
                  type="text"
                  name="city_title"
                  onChange={handleChange}
                  value={values?.city_title}
                />
                {errors.city_title && touched.city_title ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.city_title}
                  </p>
                ) : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="zipcode">Zipcode</label>
                <input
                  type="text"
                  name="zipcode"
                  onChange={handleZipCodeChange}
                  value={values?.zipcode}
                />
                {errors.zipcode && touched.zipcode ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.zipcode}
                  </p>
                ) : null}
              </div>
            </div>
            {/* <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="aboutMe">Country Code</label>
                <select
                  name="phone_code"
                  onChange={handleChange}
                  value={values.phone_code}
                >
                  <option value="">Select Country Code</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                {errors.phone_code && touched.phone_code ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.phone_code}
                  </p>
                ) : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="aboutMe">About Me</label>
                <textarea
                  name="about"
                  onChange={handleChange}
                  value={values?.about}
                ></textarea>
                {errors.about && touched.about ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.about}
                  </p>
                ) : null}
              </div>
            </div> */}
          </form>
          {isLoading ? (
            <button
              type="button"
              style={{ backgroundColor: "#9e9e9e" }}
              className={styles.saveProfileButton}
            >
              Save My Profile
            </button>
          ) : (
            <button className={styles.saveProfileButton}
              // type="submit"
              onClick={() => {
                handleSubmit()
              }}>
              Save My Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
