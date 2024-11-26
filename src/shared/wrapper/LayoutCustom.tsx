"use client";

import { post } from "@/api/base";
import Footer from "@/component/Footer/Footer";
import Header from "@/component/header/Header";
import Tabs from "@/component/home/tab";
import { authenticate, unProtectedRoute } from "@/utils/auth.util";
import { MainContent } from "@/utils/context";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const LayoutCustom = ({ children }) => {
  const path = `/${usePathname().split('/')[1]}`;
  const [sassRoles, setSassRoles] = useState([])

  const router = useRouter();
  const loginRoutes = ["/login", '/forgot-password', "/signup", , '/signup-2', '/magic', '/verifyemail', '/magic-link', '/', '/verify-email'];
  const login = loginRoutes.includes(path);
  const protectedRoutes = ["/profile", '/edit-group', '/edit-profile', '/group', '/add-group', '/all-groups', '/requsted-member'];
  const protectedRoute = protectedRoutes.includes(path);

  useEffect(() => {
    const body = { for_sas: 1 }
    post(`master/group-role/list`, body)
      .then((data: any) => {
        const responce = data.data.data;
        const SASData = responce.map((item: any) => {
          return ({
            label: item?.title,
            value: item?.id,
            color: item?.color
          })
        })
        setSassRoles(SASData)
      })
      .catch((error) => {
      });
    if (authenticate()) {
      if ([...unProtectedRoute].includes(path)) {
        router.push(`/profile`)
      }
    } else if (!authenticate() && !unProtectedRoute.includes(path)) {
      router.push('/login')
    }
  }, [])
  return (
    <>
      {protectedRoute && (
        <MainContent.Provider value={{ sassRoles }}>
          <div>
            <Header />
            <div className="main-bg">
              <Tabs />
              {children}
            </div>
            <Footer />
          </div>
        </MainContent.Provider>
      )}
      {login && <>{children}</>}
    </>
  );
};
