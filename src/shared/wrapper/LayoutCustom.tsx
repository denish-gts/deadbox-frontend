"use client";

import { authenticate, unProtectedRoute } from "@/utils/auth.util";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const LayoutCustom = ({ children }) => {
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (authenticate()) {
      if ([...unProtectedRoute].includes(path)) {
        router.push(`/home`)
      }
    } else if (!authenticate() && !unProtectedRoute.includes(path)) {
      router.push('/login')
    }
  }, [])
  return (
    <>{children}</>
  );
};
