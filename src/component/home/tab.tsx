'use client'
import { useState } from "react";
import styles from "./home.module.scss";
import { usePathname, useRouter } from "next/navigation";
// import ProfileSection from "./ProfileSection";
// import SuggestedGroupsSection from "./SuggestedGroupsSection";
// import PeopleYouMayKnowSection from "./PeopleYouMayKnowSection";
// import Group from "../group/Group";
// import EditProfile from "./EditProfile";
// import AddGroup from "../group/AddGroup";
// import Image from "next/image";
// import Myprofile from "./Myprofile";

function Profile() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 11H16C14.346 11 13 12.346 13 14V21C13 22.654 14.346 24 16 24H21C22.654 24 24 22.654 24 21V14C24 12.346 22.654 11 21 11ZM22 21C22 21.551 21.552 22 21 22H16C15.448 22 15 21.551 15 21V14C15 13.449 15.448 13 16 13H21C21.552 13 22 13.449 22 14V21ZM21 15.997C21 16.549 20.553 16.997 20 16.997H17C16.447 16.997 16 16.549 16 15.997C16 15.445 16.447 14.997 17 14.997H20C20.553 14.997 21 15.445 21 15.997ZM21 19C21 19.552 20.553 20 20 20H17C16.447 20 16 19.552 16 19C16 18.448 16.447 18 17 18H20C20.553 18 21 18.448 21 19ZM9 12C12.309 12 15 9.309 15 6C15 2.691 12.309 0 9 0C5.691 0 3 2.691 3 6C3 9.309 5.691 12 9 12ZM9 2C11.206 2 13 3.794 13 6C13 8.206 11.206 10 9 10C6.794 10 5 8.206 5 6C5 3.794 6.794 2 9 2ZM11 15C11 15.552 10.553 16 10 16H9C5.141 16 2 19.14 2 23C2 23.552 1.553 24 1 24C0.447 24 0 23.552 0 23C0 18.038 4.037 14 9 14H10C10.553 14 11 14.448 11 15Z"
        fill="black"
      />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 16C11.2089 16 10.4355 15.7654 9.77772 15.3259C9.11992 14.8864 8.60723 14.2616 8.30448 13.5307C8.00173 12.7998 7.92252 11.9956 8.07686 11.2196C8.2312 10.4437 8.61216 9.73099 9.17157 9.17158C9.73098 8.61217 10.4437 8.2312 11.2196 8.07686C11.9956 7.92252 12.7998 8.00173 13.5307 8.30448C14.2616 8.60723 14.8864 9.11993 15.3259 9.77772C15.7654 10.4355 16 11.2089 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16ZM12 10C11.6044 10 11.2178 10.1173 10.8889 10.3371C10.56 10.5568 10.3036 10.8692 10.1522 11.2346C10.0009 11.6001 9.96126 12.0022 10.0384 12.3902C10.1156 12.7781 10.3061 13.1345 10.5858 13.4142C10.8655 13.6939 11.2219 13.8844 11.6098 13.9616C11.9978 14.0387 12.3999 13.9991 12.7654 13.8478C13.1308 13.6964 13.4432 13.44 13.6629 13.1111C13.8827 12.7822 14 12.3956 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10ZM18 23C18 21.4087 17.3679 19.8826 16.2426 18.7574C15.1174 17.6321 13.5913 17 12 17C10.4087 17 8.88258 17.6321 7.75736 18.7574C6.63214 19.8826 6 21.4087 6 23C6 23.2652 6.10536 23.5196 6.29289 23.7071C6.48043 23.8946 6.73478 24 7 24C7.26522 24 7.51957 23.8946 7.70711 23.7071C7.89464 23.5196 8 23.2652 8 23C8 21.9391 8.42143 20.9217 9.17157 20.1716C9.92172 19.4214 10.9391 19 12 19C13.0609 19 14.0783 19.4214 14.8284 20.1716C15.5786 20.9217 16 21.9391 16 23C16 23.2652 16.1054 23.5196 16.2929 23.7071C16.4804 23.8946 16.7348 24 17 24C17.2652 24 17.5196 23.8946 17.7071 23.7071C17.8946 23.5196 18 23.2652 18 23ZM18 8C17.2089 8 16.4355 7.76541 15.7777 7.32588C15.1199 6.88636 14.6072 6.26164 14.3045 5.53074C14.0017 4.79983 13.9225 3.99557 14.0769 3.21964C14.2312 2.44372 14.6122 1.73098 15.1716 1.17157C15.731 0.612165 16.4437 0.231202 17.2196 0.0768607C17.9956 -0.0774802 18.7998 0.00173312 19.5307 0.304484C20.2616 0.607234 20.8864 1.11992 21.3259 1.77772C21.7654 2.43552 22 3.20888 22 4C22 5.06087 21.5786 6.07828 20.8284 6.82843C20.0783 7.57858 19.0609 8 18 8ZM18 2C17.6044 2 17.2178 2.1173 16.8889 2.33706C16.56 2.55683 16.3036 2.86918 16.1522 3.23464C16.0009 3.60009 15.9613 4.00222 16.0384 4.39018C16.1156 4.77815 16.3061 5.13451 16.5858 5.41422C16.8655 5.69392 17.2219 5.8844 17.6098 5.96157C17.9978 6.03874 18.3999 5.99914 18.7654 5.84776C19.1308 5.69639 19.4432 5.44004 19.6629 5.11114C19.8827 4.78224 20 4.39557 20 4C20 3.46957 19.7893 2.96086 19.4142 2.58579C19.0391 2.21072 18.5304 2 18 2ZM24 15C23.9984 13.4092 23.3658 11.884 22.2409 10.7591C21.116 9.63424 19.5908 9.00159 18 9C17.7348 9 17.4804 9.10536 17.2929 9.2929C17.1054 9.48043 17 9.73479 17 10C17 10.2652 17.1054 10.5196 17.2929 10.7071C17.4804 10.8946 17.7348 11 18 11C19.0609 11 20.0783 11.4214 20.8284 12.1716C21.5786 12.9217 22 13.9391 22 15C22 15.2652 22.1054 15.5196 22.2929 15.7071C22.4804 15.8946 22.7348 16 23 16C23.2652 16 23.5196 15.8946 23.7071 15.7071C23.8946 15.5196 24 15.2652 24 15ZM6 8C5.20887 8 4.43552 7.76541 3.77772 7.32588C3.11992 6.88636 2.60723 6.26164 2.30448 5.53074C2.00173 4.79983 1.92252 3.99557 2.07686 3.21964C2.2312 2.44372 2.61216 1.73098 3.17157 1.17157C3.73098 0.612165 4.44371 0.231202 5.21964 0.0768607C5.99556 -0.0774802 6.79983 0.00173312 7.53073 0.304484C8.26164 0.607234 8.88635 1.11992 9.32588 1.77772C9.7654 2.43552 10 3.20888 10 4C10 5.06087 9.57857 6.07828 8.82843 6.82843C8.07828 7.57858 7.06087 8 6 8ZM6 2C5.60444 2 5.21776 2.1173 4.88886 2.33706C4.55996 2.55683 4.30362 2.86918 4.15224 3.23464C4.00087 3.60009 3.96126 4.00222 4.03843 4.39018C4.1156 4.77815 4.30608 5.13451 4.58579 5.41422C4.86549 5.69392 5.22186 5.8844 5.60982 5.96157C5.99778 6.03874 6.39991 5.99914 6.76537 5.84776C7.13082 5.69639 7.44318 5.44004 7.66294 5.11114C7.8827 4.78224 8 4.39557 8 4C8 3.46957 7.78929 2.96086 7.41421 2.58579C7.03914 2.21072 6.53043 2 6 2ZM2 15C2 13.9391 2.42143 12.9217 3.17157 12.1716C3.92172 11.4214 4.93913 11 6 11C6.26522 11 6.51957 10.8946 6.70711 10.7071C6.89464 10.5196 7 10.2652 7 10C7 9.73479 6.89464 9.48043 6.70711 9.2929C6.51957 9.10536 6.26522 9 6 9C4.40919 9.00159 2.88399 9.63424 1.75911 10.7591C0.63424 11.884 0.00158843 13.4092 0 15C0 15.2652 0.105357 15.5196 0.292893 15.7071C0.48043 15.8946 0.734784 16 1 16C1.26522 16 1.51957 15.8946 1.70711 15.7071C1.89464 15.5196 2 15.2652 2 15Z"
        fill="black"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 24H8.99999V20.487C7.95725 20.1181 6.99145 19.5601 6.15099 18.841L3.10699 20.6L0.106995 15.4L3.14999 13.645C2.9501 12.5574 2.9501 11.4426 3.14999 10.355L0.106995 8.6L3.10699 3.4L6.15099 5.159C6.99145 4.43993 7.95725 3.88194 8.99999 3.513V0H15V3.513C16.0427 3.88194 17.0085 4.43993 17.849 5.159L20.893 3.4L23.893 8.6L20.85 10.355C21.0499 11.4426 21.0499 12.5574 20.85 13.645L23.893 15.4L20.893 20.6L17.849 18.842C17.0085 19.5607 16.0427 20.1184 15 20.487V24ZM11 22H13V18.973L13.751 18.779C14.983 18.4598 16.1044 17.8101 16.994 16.9L17.537 16.347L20.16 17.862L21.16 16.13L18.54 14.617L18.746 13.871C19.0846 12.6439 19.0846 11.3481 18.746 10.121L18.54 9.375L21.16 7.862L20.16 6.13L17.537 7.649L16.994 7.1C16.1039 6.19134 14.9826 5.54302 13.751 5.225L13 5.027V2H11V5.027L10.249 5.221C9.01698 5.54015 7.8956 6.18988 7.00599 7.1L6.46299 7.653L3.83999 6.134L2.83999 7.866L5.45999 9.379L5.25399 10.125C4.91535 11.3521 4.91535 12.6479 5.25399 13.875L5.45999 14.621L2.83999 16.134L3.83999 17.866L6.46299 16.351L7.00599 16.904C7.89608 17.8127 9.01742 18.461 10.249 18.779L11 18.973V22ZM12 16C11.2089 16 10.4355 15.7654 9.77771 15.3259C9.11992 14.8864 8.60723 14.2616 8.30448 13.5307C8.00173 12.7998 7.92251 11.9956 8.07685 11.2196C8.23119 10.4437 8.61216 9.73098 9.17157 9.17157C9.73098 8.61216 10.4437 8.2312 11.2196 8.07686C11.9956 7.92252 12.7998 8.00173 13.5307 8.30448C14.2616 8.60723 14.8863 9.11992 15.3259 9.77772C15.7654 10.4355 16 11.2089 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16ZM12 10C11.6044 10 11.2178 10.1173 10.8889 10.3371C10.56 10.5568 10.3036 10.8692 10.1522 11.2346C10.0009 11.6001 9.96125 12.0022 10.0384 12.3902C10.1156 12.7781 10.3061 13.1345 10.5858 13.4142C10.8655 13.6939 11.2219 13.8844 11.6098 13.9616C11.9978 14.0387 12.3999 13.9991 12.7654 13.8478C13.1308 13.6964 13.4432 13.44 13.6629 13.1111C13.8827 12.7822 14 12.3956 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10Z"
        fill="black"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 21V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H8V0H3C2.20435 0 1.44129 0.31607 0.87868 0.87868C0.31607 1.44129 0 2.20435 0 3L0 21C0 21.7956 0.31607 22.5587 0.87868 23.1213C1.44129 23.6839 2.20435 24 3 24H8V22H3C2.73478 22 2.48043 21.8946 2.29289 21.7071C2.10536 21.5196 2 21.2652 2 21Z"
        fill="black"
      />
      <path
        d="M23.123 9.87897L18.537 5.29297L17.123 6.70697L21.387 10.971L5 11V13L21.443 12.971L17.121 17.293L18.535 18.707L23.121 14.121C23.6837 13.5587 24 12.7959 24.0004 12.0004C24.0007 11.2049 23.6851 10.4418 23.123 9.87897Z"
        fill="black"
      />
    </svg>
  );
}

const Tabs = () => {
  const path = usePathname();
  const router = useRouter();

  // const [activeTab, setActiveTab] = useState("MY PROFILE");
  // const handleTabClick = (tab: string) => {
  //   console.log("Tab clicked:", tab);
  //   setActiveTab(tab);
  // };

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isGroup, setIsGroup] = useState(false);

  return (
    <div>
      <nav className={styles.tabs}>
        <div
          className={`${styles.tab} ${path === "/profile" ? styles.active : ""
            }`}
          onClick={() => {
            router.push('/profile')
          }}
        >
          <Profile />

          <span className={styles.label}>MY PROFILE</span>
        </div>
        <div
          className={`${styles.tab} ${path === "/group" ? styles.active : ""
            }`}
          onClick={() => router.push('/group')}
        >
          <GroupIcon />

          <span className={styles.label}>GROUPS</span>
        </div>
        <div
          className={`${styles.tab} ${path === "/settings" ? styles.active : ""
            }`}
          onClick={() => router.push('/settings')}
        >
          <SettingsIcon />

          <span className={styles.label}>SETTINGS</span>
        </div>
        <div
          className={`${styles.tab} ${path === "/logout" ? styles.active : ""
            }`}
          onClick={() => router.push('/logout')}
        >
          <LogoutIcon />
          <span className={styles.label}>LOGOUT</span>
        </div>
      </nav>
      {/* <div className={styles.padding}>
        {activeTab === "MY PROFILE" && (
          <Myprofile/>
        )}
        {activeTab === "GROUPS" && (
          <div>
            {!isGroup ? (
              <>
                <Group isGroup={isGroup} setIsGroup={setIsGroup} />
              </>
            ) : (
              <>
                <AddGroup setIsGroup={setIsGroup}/>
              </>
            )}
          </div>
        )}
        {activeTab === "SETTINGS" && (
          <div>
            <h1>Settings</h1>
            <p>Some content about settings</p>
          </div>
        )}
        {activeTab === "LOGOUT" && (
          <div>
            <h1>Logout</h1>
            <p>Some content about logout</p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Tabs;
