import React, { useEffect, useState } from "react";
import styles from "./loginForm.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { setToken, setUserInfo } from "@/utils/auth.util";
import { axiosInstance } from "@/api/base";
import { errorCheckAPIResponse, successAPIResponse } from "@/utils/helpers";
import Loader from "@/component/loader";
import { useRouter } from "next/navigation";
const MailIcon = "/assets/icons/mail-icon.svg";
const SendLinkIcon = "/assets/icons/send-link-icon.svg";
const GoogleIcon = "/assets/icons/google-icon.svg";
const Logo = "/assets/logo/logo.svg";
const BG = "/assets/images/bg1.png";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email address is required."),
});
export default function LoginForm() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      const body = { ...values, base_url: window.location.origin };
      axiosInstance
        .post(`auth/send_magic_link`, body)
        .then((res) => {
          successAPIResponse(res);
          //   setIsMagicLink(true);
          router.push("/magic");
          setIsLoading(false);
        })
        .catch((error) => {
          errorCheckAPIResponse(error);
          setIsLoading(false);
        });
    },
  });
  const router = useRouter();
  useEffect(() => {
    if (session && Object.keys(session).length > 0) {
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

  const handleGoogleSignIn = async () => {
    signIn("google");
  };
  const handleClickSendMegiclink = () => {
    formik.handleSubmit();
  };
  return (
    <div className={styles.signupSection}>
    
      <div className={styles.formContainer}>
        <div className={styles.logo}>
        <Image src={Logo} alt="Logo" unoptimized height={0} width={0} />

        </div>
        <h2>Signup</h2>
        <form>
          <select>
            <option value="">Country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
          <div className={styles.inlineInputs}>
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Zipcode" />
          </div>
          <textarea placeholder="About me"></textarea>
          <select>
            <option value="">Select Group</option>
            <option value="group1">Group 1</option>
            <option value="group2">Group 2</option>
          </select>
          <div className={styles.inlineRadios}>
            <label>Are you over 13?</label>
            <div>
              <input type="radio" id="yes" name="age" value="yes" />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input type="radio" id="no" name="age" value="no" />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="policy" />
            <label htmlFor="policy">
              I have read and understood the <a href="/privacy-policy">Privacy Policy</a>
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.imageContainer}>
      <Image src={BG} alt="Background" unoptimized height={0} width={0} />

      </div>
    
  </div>
  );
}
