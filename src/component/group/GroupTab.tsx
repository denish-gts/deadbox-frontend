"use client";

import React, { useState } from "react";
import AllGroup from "./AllGroup";
import Group from "./Group";
import styles from "./tabs.module.scss";

function GroupTab() {
  const [activeTab, setActiveTab] = useState("All-Group");

  return (
    <>
      <div className="container">
        <div className={styles.tabsContainer}>
          <div>
            <div
              className={`${styles.tab} ${activeTab === "All-Group" ? styles.active : ""}`}
              onClick={() => setActiveTab("All-Group")}
            >
              All Groups
            </div>
            <div
              className={`${styles.tab} ${activeTab === "My-Group" ? styles.active : ""}`}
              onClick={() => setActiveTab("My-Group")}
            >
              My Group
            </div>
          </div>
        </div>

        {activeTab === "All-Group" ? <AllGroup /> : <Group />}
      </div>
    </>
  );
}

export default GroupTab;
