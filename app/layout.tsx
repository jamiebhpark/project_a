import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSideBar";
import ClientProviders from "../components/ClientProviders";

export const metadata = {
  title: "Project_A",
  description: "모두가 투명하게 만드는 가장 핫한 트렌드",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white text-black min-h-screen">
        <ClientProviders>
          {/* 헤더 고정 */}
          <div className="sticky top-0 z-50">
            <Header />
            <hr className="border-gray-200" />
          </div>
          {/* 메인 컨테이너: 좌측/우측 사이드바와 중앙 콘텐츠 */}
          <div className="flex min-h-screen">
            <div className="sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
              <Sidebar />
            </div>
            <main className="flex-1 p-4">{children}</main>
            <div className="sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
              <RightSidebar />
            </div>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
