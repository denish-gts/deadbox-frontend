import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./header.module.scss";
const SearchIcon = "/assets/icons/blue-search-icon.svg";
const Logo = "/assets/logo/logo.jpeg";
const Message = "/assets/images/message.svg";
const NotificationIcon = "/assets/images/noti.svg";
const   ProfileImg = "/assets/images/people.png";
export default function Header() {

  return (
    <header className={styles.header}>
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
        <img height={0} width={0} src={ProfileImg} alt="User Icon" className={styles.userIcon} />
      </div>
    </header>
  );
}
