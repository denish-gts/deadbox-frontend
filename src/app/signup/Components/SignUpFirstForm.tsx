import Image from "next/image";
import { useState } from "react";
import styles from "./signupForm.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const UserIcon = "/assets/images/user1.png";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/signin1.jpg";

export default function SignUpFirstForm({
  formik,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { handleSubmit, values, touched, errors, handleChange, setValues } = formik;
  // const [avatar, setAvatar] = useState(null);
  // const handleAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (upload) => {
  //       setAvatar(upload.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //     setValues({ ...values, avatar: file });
  //   }
  // };

  return (
    <>
      <div className={styles.signupSection}>
        <div className={styles.formContainer}>
          <div className={styles.logo}>
            <Image src={Logo} alt="Logo" unoptimized height={0} width={0} />
          </div>
          <h2>Signup Step 1</h2>
          {/* <div className={styles.avatarContainer}>
            <div
              className={styles.avatar}
              onClick={() => document.getElementById("avatarInput").click()}
            >
              {avatar ? (
                <img src={avatar} alt="Avatar" className={styles.aa} />
              ) : (
                <img src={UserIcon} alt="User Icon" />
              )}
            </div>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div> */}

          {/* <div className={styles.avatarupload}>
            <div className={styles.avataricon} onClick={() => document.getElementById("avatarInput").click()}>
              {avatar ? (
                <img src={avatar} alt="Avatar" className={styles.aa} />
              ) : (
                <img src={UserIcon} alt="User Icon" />
              )}
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </div>
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
                  <p className={styles.error_content}>
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
                  <p className={styles.error_content}>
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
              <p className={styles.error_content}>
                {errors.email}
              </p>
            ) : null}
            <div className={styles.phonenumberContainer}>
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
                <p className={styles.error_content}>
                  {errors.phone_code}
                </p>
              ) : null}
              <input
                type="number"
                placeholder="Phone Number"
                name="phone"
                onChange={handleChange}
                value={values.phone}
              />
              {errors.phone && touched.phone ? (
                <p className={styles.error_content}>
                  {errors.phone}
                </p>
              ) : null}
            </div>
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
              <p className={styles.error_content}>
                {errors.password}
              </p>
            ) : null}
            <div className={styles.radiogroup}>
              <span>Are you over 13?</span>
              <div className={styles.flex}>
                <input type="radio"
                  onChange={() => {
                    setValues({ ...values, over_13: true });
                  }}
                  checked={values?.over_13}
                  id="yes"
                  name="age"
                />
                <label htmlFor="yes">Yes</label>
                <input
                  type="radio"
                  id="no"
                  onChange={() => {
                    setValues({ ...values, over_13: false });
                  }}
                  name="age"
                  checked={values?.over_13 === false}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>

            <div className={styles.checkboxContainer}>
              <label className={styles.customcheckbox}>
                <input
                  type="checkbox"
                  checked={values.privacy_policy === '1'}
                  name="privacy_policy"
                  onChange={(e) => {
                    const value = e.target.checked ? '1' : '0'
                    setValues({ ...values, privacy_policy: value });
                  }}
                />
                <span className={styles.checkmark}></span>
              </label>
              <label htmlFor="policy" className={styles.labelAlignment}>
                I agree to Terms and Conditions and Privacy Policy
              </label>
            </div>
            {values?.privacy_policy === '1' && values?.over_13 ? (
              <>
                <button onClick={() => { handleSubmit() }}>Next Step</button>
              </>
            ) : (
              <button style={{ backgroundColor: "#9e9e9e" }} type="button">
                Next Step
              </button>
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
    </>
  );
}
