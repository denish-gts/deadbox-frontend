import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./loginForm.module.scss";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/bg1.png";

export default function LoginForm() {

  const router = useRouter();
  

  return (
    <div className={styles.signupSection}>
    
      <div className={styles.formContainer}>
        <div className={styles.logo}>
        <Image src={Logo} alt="Logo" unoptimized height={0} width={0} />

        </div>
        <h2>Signup</h2>
        <form>
        <select>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
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
