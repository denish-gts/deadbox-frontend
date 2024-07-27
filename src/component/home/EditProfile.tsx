import styles from './home.module.scss'

export default function EditProfile ()  {
    
    return (
      <div className={styles.editProfileContainer}>
     
      <div className={styles.profileFormContainer}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            <img src="https://via.placeholder.com/150" alt="Avatar" className={styles.avatarImage} />
            <button className={styles.deleteAvatarButton}>🗑️</button>
          </div>
        </div>
        <div className={styles.formSection}>
        <h1 className={styles.header}>Edit Profile</h1>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" defaultValue="Leslie" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" defaultValue="Alexander" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="callSign">Call Sign</label>
              <input type="text" id="callSign" name="callSign" defaultValue="Alexle" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender">
                <option value="female" selected>Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" name="phone" defaultValue="+12146649110" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" defaultValue="lesliealexander@gmail.com" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" defaultValue="920 S Harwood St, Dallas, TX 75201" />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="country">Country</label>
              <select id="country" name="country">
                <option value="usa" selected>USA</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="state">State</label>
              <input type="text" id="state" name="state" defaultValue="Texas" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" defaultValue="Dallas" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="zipcode">Zipcode</label>
              <input type="text" id="zipcode" name="zipcode" defaultValue="75201" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="aboutMe">About Me</label>
            <textarea id="aboutMe" name="aboutMe" >
              Leslie Alexander was born on January 12, 1943. He grew up in New York City, where he developed a passion for sports. Alexander pursued higher education at Harvard University, where he earned a degree in economics. She has contributed to various charitable causes and organizations, focusing on improving the lives of people in Houston and beyond. Alexander was committed to the team’s development and often focused on creating a strong organizational culture.
            </textarea>
          </div>
          <button className={styles.saveProfileButton}>Save My Profile</button>
        </div>
      </div>
    </div>
    );
  };