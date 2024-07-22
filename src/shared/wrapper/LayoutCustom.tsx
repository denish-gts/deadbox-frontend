"use client";

import Sidebar from "@/component/sidebar/Sidebar";
import { authenticate, unProtectedRoute } from "@/utils/auth.util";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./LayoutCustom.module.scss";

export const LayoutCustom = ({ children }) => {
  const path = usePathname();
  const router = useRouter();
  const isEmptyValue = (value) => {
    if (value === '' || value === null || value === undefined) {
      return true
    } else {
      return false
    }
  }
  const sidebarRoutes = ["/dashboard", '/firm-list'];
  const headerRoutes = ["/dashboard", '/firm-list'];
  const headerHomeRoutes = ["/"];
  const loginRoutes = ["/login", "/signup", '/magic', '/magic-link'];
  const isFirmRoute = path.split('/').includes('firm') && !isEmptyValue(path.split('/')[2])
  const isSidebarRoute = isFirmRoute ? isFirmRoute : sidebarRoutes.includes(path);
  const isHeaderOnlyRoute = headerRoutes.includes(path);
  const isHeaderHomeRoute = headerHomeRoutes.includes(path);
  const login = loginRoutes.includes(path);

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false); // Open sidebar if screen width is 768px or less
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    if (authenticate()) {
      if ([...unProtectedRoute].includes(path)) {
        router.push(`/dashboard`)
      }
    } else if (!authenticate() && !unProtectedRoute.includes(path)) {
      router.push('/login')
    }
  }, [])
  return (
    // <MainContent.Provider>
    <>
      {isSidebarRoute && (
        <div className={styles.layoutCustomSection}>
          <div
            className={`${isSidebarOpen ? styles.layoutCustomLeft : styles.layoutCustomLefts
              }`}
          >
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          </div>
          <div
            className={`${isSidebarOpen
              ? styles.layoutCustomRight
              : styles.layoutCustomRights
              }`}
          >
            {/* <Header onToggleSidebar={toggleSidebar} /> */}

            {children}
          </div>
        </div>
      )}
      {isHeaderHomeRoute && (
        <>
          {/* {isHeaderHomeRoute && <HomeHeader />} */}

          {children}
        </>
      )}
      {login && <>{children}</>}
    </>
    // </MainContent.Provider>
  );
};
