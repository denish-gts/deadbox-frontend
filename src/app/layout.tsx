import { LayoutCustom } from "@/shared/wrapper/LayoutCustom";
import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./globals.css";
const inter = Inter({  subsets: ['latin'],
  });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutCustom>{children}</LayoutCustom>
      </body>
    </html>
  );
}
