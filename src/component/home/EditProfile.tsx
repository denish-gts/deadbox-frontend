'use client'
import { useFormik } from "formik";
import styles from "./home.module.scss";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { post, postFormData } from "@/api/base";
import { errorCheckAPIResponse } from "@/utils/helpers";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required."),
  last_name: Yup.string().required("Last Name is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
  zip: Yup.string().required("Zipcode is required."),
  about: Yup.string().required("About Us is required."),
});

export default function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, values, touched, errors, handleChange, setValues } =
    useFormik({
      initialValues: {
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
        country_code: "",
        mobile_no: "",
        gender: "",
        country: "",
        zip: "",
        city: "",
        about: "",
        address: "",
        call_sign: "",
        state: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        const apiData = new FormData();

        if (values.avatar && values.avatar !== "") {
          apiData.append("f_image", values.avatar);
        }
        apiData.append("first_name", values.first_name);
        apiData.append("last_name", values.last_name);
        apiData.append("email", values.email);
        apiData.append("phone_code", values.country_code);
        apiData.append("phone", values.mobile_no);
        apiData.append("zipcode", values.zip);
        apiData.append("country_title", values.country);
        apiData.append("city_title", values.city);
        apiData.append("gender", values.gender);
        apiData.append("about", values.about);
        apiData.append("address", values.address);
        apiData.append("call_sign", values.call_sign);
        apiData.append("state", values.state);

        postFormData(`user/update-profile`, apiData)
          .then((res) => {
            toast.success(res.message);

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
        setValues({
          email: resData?.email || "",
          first_name: resData?.first_name || "",
          last_name: resData?.last_name || "",
          avatar: "",
          country_code: resData?.phone_code || "",
          mobile_no: resData?.phone || "",
          gender: resData?.gender || "",
          country: resData?.country_title || "",
          zip: resData?.zipcode || "",
          city: resData?.city_title || "",
          about: resData?.about || "",
          address: resData?.address_1 || "",
          call_sign: resData?.callSign || "",
          state: resData?.state_title || "",
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
      <div className={styles.editProfileContainer}>
        <div className={styles.profileFormContainer}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <img src={avatar} alt="Avatar" className={styles.avatarImage} />
              <button
                className={styles.deleteAvatarButton}
                onClick={() => document.getElementById("avatarInput").click()}
              >
                🗑️
              </button>
            </div>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div>
          <div className={styles.formSection}>
            <h1 className={styles.header}>Edit Profile</h1>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  value={values.first_name}
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
                  value={values.last_name}
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
                  name="call_sign"
                  onChange={handleChange}
                  value={values.call_sign}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  value={values.gender}
                >
                  <option value="female" selected>
                    Female
                  </option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="mobile_no"
                  onChange={handleChange}
                  value={values.mobile_no}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
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
            <div className={styles.formGroup}>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={values.address}
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="country">Country</label>
                <select
                  name="country"
                  onChange={handleChange}
                  value={values.country}
                >
                  <option value="usa">USA</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  name="state"
                  onChange={handleChange}
                  value={values.state}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={values.city}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="zipcode">Zipcode</label>
                <input
                  type="text"
                  name="zip"
                  onChange={handleChange}
                  value={values.zip}
                />
                {errors.zip && touched.zip ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.zip}
                  </p>
                ) : null}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="aboutMe">About Me</label>
              <textarea
                name="about"
                onChange={handleChange}
                value={values.about}
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
            {isLoading ? (
              <button
                type="button"
                style={{ backgroundColor: "#9e9e9e" }}
                className={styles.saveProfileButton}
              >
                Save My Profile
              </button>
            ) : (
              <button type="submit" className={styles.saveProfileButton}>
                Save My Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
