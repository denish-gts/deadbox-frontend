import styles from "./home.module.scss";
// import People from "../../../public/assets/images/pencil.png";
// import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
// import EditProfile from "./EditProfile";
import moment from "moment";

const ProfileSection = ({
  userData,
}: {
  userData: {
    id: number;
    sign_name: string;
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
    last_logged_in_at: string;
  };
}) => {
  const [avatar, setAvatar] = useState(null);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const textRef = useRef(null);
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      const length = textRef.current.textContent.length;
      setTextLength(length);
    }
  }, []);
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
  function capitalizeFirstLetter(str) {
    if (str?.length === 0) return str; // Handle empty string
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  return (
    <div className={styles.profileSection}>
      <div className={styles.profileCard}>
        <div className={styles.avatarContainer}>
          <div
            className={styles.avatar}
            // onClick={() => document.getElementById("avatarInput").click()}
          >
            {/* {avatar ? ( */}
            <img
              src={userData?.image}
              alt="Avatar"
              className={styles.profileImage}
            />
            {/* ) : (
              <i className={styles.icon}></i>
            )} */}
            {/* <div className={styles.plusIcon}>
              <Image src={People} alt="People" />
            </div> */}
          </div>
          {/* <input
            id="avatarInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          /> */}
        </div>

        <div className={styles.profileInfo}>
          <h2>
            @{userData?.first_name} {userData?.last_name}
          </h2>
          {/* <p>Stock Class - 30 Groups</p>
          <div className={styles.role}>VICE PRESIDENT</div> */}
        </div>
      </div>
      <div className={styles.profileDetails}>
        <div className={styles.alignText}>
          <h3>Profile</h3>
          <a
            className={styles.readMore}
            onClick={() => {
              router.push("/edit-profile");
            }}
          >
            Edit Profile
          </a>
        </div>
        <div className={styles.profileDetailsGrid}>
          <div>
            <p>
              <div>First Name:</div>{" "}
            </p>
            <h6> {capitalizeFirstLetter(userData?.first_name)}</h6>
          </div>
          <div>
            <p>
              <div>Last Name:</div>
            </p>
            <h6>{capitalizeFirstLetter(userData?.last_name)}</h6>
          </div>
          <div>
            <p>
              <div>Call Sign:</div>{" "}
            </p>
            <h6>{capitalizeFirstLetter(userData?.sign_name)}</h6>
          </div>
          <div>
            {" "}
            <p>
              <div>Country:</div>{" "}
            </p>
            <h6>{capitalizeFirstLetter(userData?.country_title)}</h6>
          </div>
          <div>
            <p>
              <div>State:</div>{" "}
            </p>
            <h6>{capitalizeFirstLetter(userData?.state_title)}</h6>
          </div>
          <div>
            <p>
              <div>City: </div>
            </p>
            <h6>{capitalizeFirstLetter(userData?.city_title)}</h6>
          </div>
          <div>
            <p>
              <div>Joined Date:</div>{" "}
            </p>
            <h6>{moment(userData?.created).format("DD MMM, YYYY")}</h6>
          </div>
          <div>
            <p>
              <div>Last Logon Date:</div>{" "}
            </p>
            <h6>
              {moment(userData?.last_logged_in_at).format("DD MMM, YYYY")}
            </h6>
          </div>
        </div>
        <div className={styles.aboutMe}>
          <p>About Me:</p>
          {/* <h6>{capitalizeFirstLetter(userData?.about)}</h6> */}
          <h6
            ref={textRef}
            className={textLength > 200 && !isExpanded ? "ellipsis" : ""}
          >
            Kenan Foundation Asia believes in a world where everyone has the
            right to build a better life for themselves, their family, and their
            community. Every day, we are working in Thailand and the region to
            inspire students, develop skilled people, and grow strong leaders by
            empowering them with the knowledge, technology, and skills necessary
            for a better future. Whether it’s an entrepreneur, a small business
            owner, a teacher, a student, a community leader, or a non-profit
            manager, we conduct tailored, engaging activities to train, coach
            and equip them so they can achieve their dreams.
          </h6>
        </div>

        <a
          className={styles.readMore}
          onClick={toggleReadMore}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_19_995)">
              <path
                d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.34591 0.761209 6.17317C0.00433286 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34872 18.9426 4.80684 17.0679 2.9321C15.1932 1.05736 12.6513 0.00286757 10 0ZM10 18.3333C8.35183 18.3333 6.74066 17.8446 5.37025 16.9289C3.99984 16.0132 2.93174 14.7117 2.30101 13.189C1.67028 11.6663 1.50525 9.99076 1.82679 8.37425C2.14834 6.75774 2.94201 5.27288 4.10745 4.10744C5.27289 2.94201 6.75774 2.14833 8.37425 1.82679C9.99076 1.50525 11.6663 1.67027 13.189 2.301C14.7118 2.93173 16.0132 3.99984 16.9289 5.37025C17.8446 6.74066 18.3333 8.35182 18.3333 10C18.3309 12.2094 17.4522 14.3276 15.8899 15.8899C14.3276 17.4522 12.2094 18.3309 10 18.3333ZM10.8333 9.16667H14.1667V10.8333H10.8333V14.1667H9.16667V10.8333H5.83334V9.16667H9.16667V5.83333H10.8333V9.16667Z"
                fill="#37B085"
              />
            </g>
            <defs>
              <clipPath id="clip0_19_995">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {isExpanded ? "Read less" : "Read more"}
        </a>
      </div>
    </div>
  );
};

export default ProfileSection;
