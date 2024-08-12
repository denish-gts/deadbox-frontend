import Image from "next/image";
import { useState } from "react";
import styles from "./signupForm.module.scss";
const UserIcon = "/assets/images/user1.png";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/signin1.jpg";

export default function SignUpFirstForm({
  formik,
}) {
  const { handleSubmit, values, touched, errors, handleChange, setValues } = formik;
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
    <form>
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
                <img src={avatar} alt="Avatar" className={styles.aa} />
              ) : (
                <img src={UserIcon} alt="User Icon" />
              )}
              {/* <div className={styles.plusIcon}>+</div> */}
            </div>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div>

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
              type="tel"
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
            <div className={styles.radiogroup}>
              <span>Are you over 13?</span>
              <div className={styles.flex}>
                <input type="radio"
                  onChange={() => {
                    setValues({ ...values, over13: "true" });
                  }}
                  checked={values?.over13 === 'true'}
                  id="yes"
                  name="age"
                />
                <label htmlFor="yes">Yes</label>
                <input
                  type="radio"
                  id="no"
                  onChange={() => {
                    setValues({ ...values, over13: "false" });
                  }}
                  name="age"
                  checked={values?.over13 === 'false'}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>

            <div className={styles.checkboxContainer}>
              <label className={styles.customcheckbox}>
                <input
                  type="checkbox"
                  checked={values.privacyPolicy === '1'}
                  name="privacyPolicy"
                  onChange={(e) => {
                    const value = e.target.checked ? '1' : '0'
                    setValues({ ...values, privacyPolicy: value });
                  }}
                />
                <span className={styles.checkmark}></span>
              </label>
              <label htmlFor="policy" className={styles.labelAlignment}>
                I have read and understood the{" "}
                {/* <a href="/privacy-policy"> */}
                Privacy Policy
                {/* </a> */}
              </label>
            </div>
            {values?.privacyPolicy === '1' && values?.over13 === 'true' ? (
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
    </form>
  );
}
