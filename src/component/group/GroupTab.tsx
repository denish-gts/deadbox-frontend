"use client";

import React, { useEffect, useState } from "react";
import AllGroup from "./AllGroup";
import Group from "./Group";
import styles from "./tabs.module.scss";
import RequestedMember from "./RequestedMember";
import { usePathname, useRouter } from "next/navigation";

function GroupTab() {
  const path = usePathname();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("All-Group");
  console.log('pathpathpathpathpathpath', path);

  useEffect(() => {
    setActiveTab(path)
  }, [path])
  return (
    <>
      <div className="container">
        <div className={styles.tabsContainer}>
          <div>
            <div
              className={`${styles.tab} ${activeTab === "/all-groups" ? styles.active : ""}`}
              onClick={() => router.push("/all-groups")}
            >
              All Groups
            </div>
            <div
              className={`${styles.tab} ${activeTab === "/group" ? styles.active : ""}`}
              onClick={() => router.push("/group")}
            >
              My Group
            </div>
            <div
              className={`${styles.tab} ${activeTab === "/requsted-member" ? styles.active : ""}`}
              onClick={() => router.push("/requsted-member")}
            >
              Requested Member
            </div>
          </div>
        </div>

        {activeTab === "/all-groups" ? <AllGroup /> : activeTab === '/group' ? <Group /> : <RequestedMember />}
      </div>
    </>
  );
}

export default GroupTab;
