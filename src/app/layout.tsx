import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SakuraPetals from "@/components/SakuraPetals";
import dynamic from "next/dynamic";

const Live2DMascot = dynamic(() => import("@/components/Live2DMascot"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "我的博客",
  description: "技术博客 - 分享编程经验与技术思考",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="relative overflow-x-hidden">
        <SakuraPetals />
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <Live2DMascot />
      </body>
    </html>
  );
}

