// "use client";
import Toast from "@/components/Common/Toast"
import Layout from "@/components/Layout/Layout"
import { Providers } from "@/redux/provider"
import { ConfigProvider } from "antd"
import viVN from "antd/locale/vi_VN"; // Import Vietnamese locale for Ant Design
import "dayjs/locale/vi"; // Import Vietnamese locale for Day.js
import { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "",
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
            <Layout>{children}</Layout>
          </Providers>
        </ConfigProvider>
        <Toast />
      </body>
    </html>
  )
}
