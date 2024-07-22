"use client"

import { useRouter } from "next/navigation"
import styles from "./magic.module.scss";
import Image from "next/image";
const Logo = "/assets/logo/logo.svg";
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
                        <Image unoptimized height={0} width={0} src={Logo} alt='Logo' />
                    </div>
                    <div className={styles.magicFormAlignment}>

                        <div className={styles.magicLinkDetailsAlignment}>
                            <Image unoptimized height={0} width={0} src={SendLinkIcon} alt='a' />
                        </div>
                        <h2>Magic Link Sent</h2>
                        <p>We have just emailed a confirmation link at the email address you just provided. Click to complete your sign up
                            process!</p>

                        <div className={styles.signUpButton} 
                            onClick={()=>router.push('/signup')}>
                            <button>Sign Up</button>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    )
}