// "use client";
import Toast from "@/components/Common/Toast";
import Layout from "@/components/Layout/Layout";
import { Providers } from "@/redux/provider";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN"; // Import Vietnamese locale for Ant Design
import "dayjs/locale/vi"; // Import Vietnamese locale for Day.js
import { Metadata } from "next";
import React from "react";
import "./globals.css";

// Import AuthWrapper để xử lý logic kiểm tra đăng nhập
import AuthWrapper from "@/components/Layout/AuthWrapper";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
    viewportFit: "cover",
    // Ngăn zoom trên Safari iOS
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider locale={viVN}>
          <Providers>
            <AuthWrapper>
              <Layout>{children}</Layout>
            </AuthWrapper>
          </Providers>
        </ConfigProvider>
        <Toast />
      </body>
    </html>
  )
}
