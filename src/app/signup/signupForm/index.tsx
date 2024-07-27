import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./signupForm.module.scss";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/bg.png";

export default function SignupForm() {
  const router = useRouter();

  const redirectToLogin = () => {
    console.log("click");
    router.push("/login");
  };

  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setAvatar(upload.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
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

        <div className={styles.form}>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />

          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number" />
          <button onClick={redirectToLogin}>Next Step</button>
        </div>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      <div className={styles.imageContainer}>
        <Image src={BG} alt="Background" unoptimized height={0} width={0} />
      </div>
    </div>
  );
}

