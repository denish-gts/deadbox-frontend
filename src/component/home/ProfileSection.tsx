import styles from "./home.module.scss";
import People from "../../../public/assets/images/people.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EditProfile from "./EditProfile";
const ProfileSection = ({
  isEditProfile,
  setIsEditProfile,
}: {
  isEditProfile: boolean;
  setIsEditProfile: (isEditProfile: boolean) => void;
}) => {
  const [avatar, setAvatar] = useState(null);
  const router = useRouter();

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
    <div className={styles.profileSection}>
      <div className={styles.profileCard}>
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
            <div className={styles.plusIcon}>Edit</div>
          </div>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
        </div>

        <div className={styles.profileInfo}>
          <h2>@Leslie Alexander</h2>
          <p>Stock Class - 30 Groups</p>
          <div className={styles.role}>VICE PRESIDENT</div>
        </div>
      </div>
      <div className={styles.profileDetails}>
        <h3>Profile</h3>
        <div className={styles.profileDetailsGrid}>
          <div>
            <p>
              <div>
                <strong>First Name:</strong>
              </div>{" "}
              Leslie
            </p>
          </div>
          <div>
            <p>
              <div>
                <strong>First Name:</strong>
              </div>
              Alexander
            </p>
          </div>
          <div>
            <p>
             <div>
             <strong>Call Sign:</strong></div> Alexie
            </p>
          </div>
          <div>
            {" "}
            <p>
              <div>
              <strong>Country:</strong></div> USA
            </p>
          </div>
          <div>
            <p>
              <div>
              <strong>State:</strong></div> Texas
            </p>
          </div>
          <div>
            <p>
              <div>
              <strong>City:</strong> </div>Dallas
            </p>
          </div>
          <div>
            <p>
             <div>
             <strong>Joined Date:</strong></div> 15 Aug 2005
            </p>
          </div>
          <div>
            <p>
             <div>
             <strong>Last Logon Date:</strong></div> 22 Jun 2024
            </p>
          </div>
        </div>
        <p>
          <div className={styles.aboutMe}>
            <strong>About Me:</strong>{" "}
          </div>
          Leslie Alexander was born on January 12, 1943. He grew up in New York
          City, where he developed a passion for sports...
        </p>
        <a className={styles.readMore} onClick={() => setIsEditProfile(true)}>
          READ MORE
        </a>
      </div>
    </div>
  );
};

export default ProfileSection;
