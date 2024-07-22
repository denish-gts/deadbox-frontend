import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import classNames from "classnames";
import { signOut } from "next-auth/react";
import { setToken } from "@/utils/auth.util";

const Logo = "/assets/logo/logo.svg";
const DashboradIcon = "/assets/icons/dashbord-icon.svg";
const PEFirmIcon = "/assets/icons/calculatore-icon.svg";
const ReportIcon = "/assets/icons/chart-icon.svg";
const ProfileIcon = "/assets/icons/member-list.svg";
const LogouIcon = "/assets/icons/sign-out-alt.svg";
const CoseIcon = "/assets/icons/close.png";
export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();
  const path = usePathname().split("/")[1];
  console.log('path', path);

  const handleClickLogout = () => {
    setToken("")
    signOut({ callbackUrl: "/login" })

  }
  return (
    // <div className={classNames(styles.sidebarSection, toggleSidebar ? styles.smallSidebar : "")}>

    <div className={styles.sidebarSection}>
      <div className={styles.sidebarTop}>
        <div className={styles.sidebarFlexAlignment}>
          <div className={styles.sidebarLogo} onClick={() => router.push('/')}>
            <Image unoptimized height={0} width={0} src={Logo} alt="Logo" />
          </div>
          <div className={styles.closeIcon} >
            <Image src={CoseIcon} alt="CoseIcon" unoptimized height={0} width={0} />
          </div>
        </div>

        <div className={styles.sidebarMenu}>
          <div className={`${styles.menuList} ${path === 'dashboard' ? styles.activeMenu : ''}`}>
            <a onClick={() => router.push("/dashboard")}>
              {" "}
              <Image
                unoptimized
                height={0}
                width={0}
                src={DashboradIcon}
                alt="DashboradIcon"
              />
              <p>Dashboard</p>
            </a>
          </div>
          <div className={`${styles.menuList} ${path === 'firm-list' ? styles.activeMenu : ''}`}>
            <a onClick={() => router.push("/firm-list")}>
              {" "}
              <Image
                unoptimized
                height={0}
                width={0}
                src={PEFirmIcon}
                alt="PEFirmIcon"
              />
              <p> PE Firms</p>
            </a>
          </div>
          <div className={styles.menuList}>
            <a>
              {" "}
              <Image
                unoptimized
                height={0}
                width={0}
                src={ReportIcon}
                alt="ReportIcon"
              />
              <p>Reports</p>
            </a>
          </div>
          <div className={styles.menuList}>
            <a>
              {" "}
              <Image
                unoptimized
                height={0}
                width={0}
                src={ProfileIcon}
                alt="ProfileIcon"
              />
              <p>Profile </p>{" "}
            </a>
          </div>
          <div className={styles.menuList} onClick={() => { handleClickLogout() }}>
            <a>
              <Image
                unoptimized
                height={0}
                width={0}
                src={LogouIcon}
                alt="LogouIcon"
              />
              <p>Logout</p>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.sidebarBottom}>
        <p>© 2024 Stone-Goff Partners. All Rights Reserved.</p>
      </div>
    </div>
  );
}
