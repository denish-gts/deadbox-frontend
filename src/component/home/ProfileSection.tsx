import styles from "./home.module.scss";
import People from "../../../public/assets/images/pencil.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditProfile from "./EditProfile";
import moment from "moment";

const ProfileSection = ({
  isEditProfile,
  setIsEditProfile,
  userData,
  setuserData,
}: {
  isEditProfile: boolean;
  setIsEditProfile: (isEditProfile: boolean) => void;
  userData: {
    id: number;
    role_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_code: string;
    phone: string;
    image: string;
    over_13: boolean;
    privacy_policy: boolean;
    address_1: string;
    address_2: string;
    city_title: string;
    state_title: string;
    country_title: string;
    zipcode: string;
    gender: string;
    about: string;
    created: string;
  };
  setuserData: (userData: any) => void;
}) => {
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
    <div className={styles.profileSection}>
      <div className={styles.profileCard}>
        <div className={styles.avatarContainer}>
          <div
            className={styles.avatar}
            onClick={() => document.getElementById("avatarInput").click()}
          >
            {/* {avatar ? ( */}
            <img src={userData?.image} alt="Avatar" />
            {/* ) : (
              <i className={styles.icon}></i>
            )} */}
            <div className={styles.plusIcon}>
              <Image src={People} alt="People" />
            </div>
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
          <h2>
            @{userData?.first_name} {userData?.last_name}
          </h2>
          <p>Stock Class - 30 Groups</p>
          <div className={styles.role}>VICE PRESIDENT</div>
        </div>
      </div>
      <div className={styles.profileDetails}>
        <div className={styles.alignText}>
          <h3>Profile</h3>
          <a className={styles.readMore} onClick={() => setIsEditProfile(true)}>
            Edit Profile
          </a>
        </div>
        <div className={styles.profileDetailsGrid}>
          <div>
            <p>
              <div>
                <strong>First Name:</strong>
              </div>{" "}
              {userData?.first_name}
            </p>
          </div>
          <div>
            <p>
              <div>
                <strong>Last Name:</strong>
              </div>
              {userData?.last_name}
            </p>
          </div>
          <div>
            <p>
              <div>
                <strong>Call Sign:</strong>
              </div>{" "}
              Alexie
            </p>
          </div>
          <div>
            {" "}
            <p>
              <div>
                <strong>Country:</strong>
              </div>{" "}
              {userData?.country_title}
            </p>
          </div>
          <div>
            <p>
              <div>
                <strong>State:</strong>
              </div>{" "}
              {userData?.state_title}
            </p>
          </div>
          <div>
            <p>
              <div>
                <strong>City:</strong>{" "}
              </div>
              {userData?.city_title}
            </p>
          </div>
          <div>
            <p>
              <div>
                <strong>Joined Date:</strong>
              </div>{" "}
              {moment(userData?.created).format("DD MMM, YYYY")}
            </p>
          </div>
          <div>
            <p>
              <div>
                <strong>Last Logon Date:</strong>
              </div>{" "}
              -
            </p>
          </div>
        </div>
        <p>
          <div className={styles.aboutMe}>
            <strong>About Me:</strong>{" "}
          </div>
          {userData?.about}
        </p>
        <a className={styles.readMore} onClick={() => setIsEditProfile(true)}>
          READ MORE
        </a>
      </div>
    </div>
  );
};

export default ProfileSection;
