"use client";

import Footer from "@/component/Footer/Footer";
import Header from "@/component/header/Header";
import Tabs from "@/component/home/tab";
import { authenticate, unProtectedRoute } from "@/utils/auth.util";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const LayoutCustom = ({ children }) => {
  const path = usePathname();
  console.log('pathpathpathpathpath',path);
  
  const router = useRouter();
  const loginRoutes = ["/login", "/signup", '/magic', '/magic-link', '/'];
  const login = loginRoutes.includes(path);
  const protectedRoutes = ["/profile", '/edit-profile', '/group', '/add-group'];
  const protectedRoute = protectedRoutes.includes(path);

  useEffect(() => {
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
        <div>
          <Header />
          <div className="main-bg">
            <Tabs />
            {children}
          </div>
          <Footer />
        </div>
      )}
      {login && <>{children}</>}
    </>
  );
};
