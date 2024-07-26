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
const UserIcon = "/assets/icons/user-icon.svg";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/bg.png";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required."),
  last_name: Yup.string().required("Last Name is required."),
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
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, values, errors, handleChange, setValues } = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      avatar: "",
      country_code: "",
      mobile_no: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      setinputData(values);
      setFirstOpen(false);
      // axiosInstance
      //   .post(`auth/user/register`, values)
      //   .then((res) => {
      //     successAPIResponse(res);
      //     const body = { ...values, base_url: window.location.origin };
      //     axiosInstance
      //       .post(`auth/send_magic_link`, body)
      //       .then((res) => {
      //         router.push("/magic");
      //         successAPIResponse(res);
      //         setIsLoading(false);
      //       })
      //       .catch((error) => {
      //         errorCheckAPIResponse(error);
      //         setIsLoading(false);
      //       });
      //   })
      //   .catch((error) => {
      //     errorCheckAPIResponse(error);
      //     setIsLoading(false);
      //   });
    },
  });

  console.log(errors);

  const handlegoogleSignup = async () => {
    signIn("google");
  };
  // const handleClickSendMegiclink = () => {
  //   formik.handleSubmit();
  // };
  useEffect(() => {
    if (session) {
      setIsLoading(true);
      const fullname = session?.user?.name;
      const body = {
        email: session?.user?.email,
        first_name: fullname.split(" ")[0],
        last_name: fullname.split(" ")[1],
      };
      axiosInstance
        .post(`/auth/authorize`, body)
        .then((res) => {
          setToken(res.data.access_token);
          setUserInfo(res.data.data);
          router.push(`/dashboard`);
          setIsLoading(false);
        })
        .catch((error) => {
          errorCheckAPIResponse(error);
          setIsLoading(false);
        });
    }
  }, [session]);
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
                <i className={styles.icon}></i>
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
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={handleChange}
              value={values.first_name}
            />
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
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={handleChange}
              value={values.last_name}
            />
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
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
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
            <select
              name="country_code"
              onChange={handleChange}
              value={values.country_code}
            >
              <option value="">Select Country Code</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="tel"
              placeholder="Phone Number"
              name="mobile_no"
              onChange={handleChange}
              value={values.mobile_no}
            />
            <button type="submit">Next Step</button>
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
