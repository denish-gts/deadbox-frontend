import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./header.module.scss";
import { useEffect, useState } from "react";
import { post } from "@/api/base";
import { errorCheckAPIResponse } from "@/utils/helpers";
const SearchIcon = "/assets/icons/blue-search-icon.svg";
const Logo = "/assets/logo/logo.jpeg";
const Message = "/assets/images/message.svg";
const NotificationIcon = "/assets/images/noti.svg";
const ProfileImg = "/assets/images/people.png";
export default function Header() {
  const [userData, setuserData] = useState<any>(null);

  useEffect(() => {
    post(`user/get-profile`)
      .then((res) => {
        setuserData(res?.data?.data);
      })
      .catch((error) => {
        errorCheckAPIResponse(error);
      });
  }, []);
  const noImag = userData?.image?.split('/');
  const Nodata = noImag && noImag[noImag.length - 1] === 'no-image.jpg'

  return (
    <header className={styles.mainHeader}>
      <div className="container">

        <div className={styles.header}>
          <div className={styles.logo}>
            <Image src={Logo} alt="Logo" unoptimized height={0} width={0} />
          </div>
          <div className={styles.searchContainer}>
            <input className={styles.search} type="text" placeholder="Search by user, groups, location etc..." />
            {/* <span className={styles.searchIcon}>🔍</span> */}
          </div>
          <div className={styles.icons}>

            <Image unoptimized height={0} width={0} src={NotificationIcon} alt="Noti" className={styles.defaultIcon} />
            <Image unoptimized height={0} width={0} src={Message} alt="Message" className={styles.defaultIcon} />
            {Nodata ?
                <div className={styles.userImgNoData}>
                  {userData?.first_name[0] + userData?.last_name[0]}
                </div>
                :
                <img src={userData?.image || ''} alt="" className={styles.userIcon} />
              }
          </div>
        </div>
      </div>
    </header>
  );
}
