"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiMoreVertical } from "react-icons/fi";

/**
 * Header 컴포넌트는 좌측에 로고와 제목,
 * 중앙에 적절한 크기의 검색창, 우측에 로그인/사용자 닉네임 및 More 버튼을 포함합니다.
 */
const Header = () => {
  const [isLoggedIn] = useState(false);
  const username = "User123";

  return (
    <header className="bg-white shadow px-4 py-2 flex items-center justify-between">
      {/* 좌측: 로고와 제목 */}
      <div className="flex items-center space-x-2">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Project_A Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="ml-2 text-xl font-bold text-gray-800">
            Project_A
          </span>
        </Link>
      </div>

      {/* 중앙: 제한된 너비의 검색창 */}
      <div className="flex-1 mx-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* 우측: 로그인/닉네임 및 More 버튼 */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="flex items-center space-x-2">
            <span className="text-gray-800 font-medium">{username}</span>
          </div>
        ) : (
          <Link
            href="/signin"
            className="px-4 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition"
          >
            Sign In
          </Link>
        )}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="More options"
        >
          <FiMoreVertical className="text-gray-600" size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
