"use client";

import { useRouter } from "next/navigation";
import styles from "./magic.module.scss";
import Image from "next/image";
const Logo = "/assets/logo/logo.jpeg";
const SendLinkIcon = "/assets/icons/send-link-icon.svg";
export default function Magic() {
  const router = useRouter();
  return (
    <>
      <div className={styles.magicSection}>
        <div className={styles.magicLeftSide}>
          <div className={styles.magicSideBannerDetails}>
            <div className={styles.logo}>
              <Image height={0} width={0} unoptimized alt="11" src={Logo} />
            </div>
          </div>
        </div>
        <div className={styles.magicRightSide}>
          <div className={styles.mobileViewLogo}>
            <Image unoptimized height={0} width={0} src={Logo} alt="Logo" />
          </div>
          <div className={styles.magicFormAlignment}>
            <div className={styles.magicLinkDetailsAlignment}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_58_16)">
                  <path
                    d="M10.827 13.452C11.263 13.818 11.795 14.004 12.323 14.004C12.698 14.004 13.07 13.91 13.403 13.723L22.827 9.03502C23.561 8.60903 24 7.84703 24 6.99803C24 6.14903 23.561 5.38903 22.771 4.93303L13.448 0.301025C12.6 -0.174975 11.573 -0.0799748 10.827 0.548025C10.083 1.17303 9.812 2.17003 10.167 3.16503L11.902 7.00003L10.135 10.914C9.811 11.83 10.084 12.827 10.827 13.452ZM18.697 6.63003L13.535 5.75903L12.021 2.42003C11.962 2.25203 12.039 2.14203 12.114 2.07803C12.158 2.04103 12.219 2.00603 12.302 2.00603C12.36 2.00603 12.429 2.02303 12.512 2.06803L21.822 6.69303C21.975 6.78203 21.999 6.92203 21.999 6.99903C21.999 7.07603 21.976 7.21703 21.879 7.27503L12.467 11.955C12.31 12.044 12.189 11.984 12.113 11.922C12.038 11.859 11.961 11.748 11.988 11.659L13.535 8.24102L18.696 7.37003C19.1 7.28903 19.1 6.71103 18.696 6.63003H18.697ZM10 23C10 23.553 9.552 24 9 24H7C6.448 24 6 23.553 6 23C6 22.447 6.448 22 7 22H9C9.552 22 10 22.447 10 23ZM24 20C24 22.206 22.206 24 20 24H13C12.448 24 12 23.553 12 23C12 22.447 12.448 22 13 22H20C21.103 22 22 21.103 22 20C22 18.897 21.103 18 20 18H6C2.691 18 0 15.309 0 12C0 8.69102 2.691 6.00003 6 6.00003H8C8.552 6.00003 9 6.44703 9 7.00003C9 7.55303 8.552 8.00003 8 8.00003H6C3.794 8.00003 2 9.79402 2 12C2 14.206 3.794 16 6 16H20C22.206 16 24 17.794 24 20ZM4 23C4 23.553 3.552 24 3 24H1C0.448 24 0 23.553 0 23C0 22.447 0.448 22 1 22H3C3.552 22 4 22.447 4 23Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_58_16">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2>Magic Link Sent</h2>
            <p>
              We have just emailed a confirmation link at the email address you
              just provided. Click to complete your sign up process!
            </p>

            <div
              className={styles.signUpButton}
              onClick={() => router.push("/signup")}
            >
              <button>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
