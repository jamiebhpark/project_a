"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiHome,
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  FaTrophy,
  FaRegLaugh,
  FaChartLine,
  FaTshirt,
  FaMusic,
  FaFilm,
  FaGamepad,
  FaUserAlt,
  FaBriefcase,
  FaStar,
  FaCrown,
} from "react-icons/fa";

const Sidebar = () => {
  // 토글 상태 관리
  const [isContestOpen, setContestOpen] = useState(false);
  const [isAskOpen, setAskOpen] = useState(false);
  const [isTopicsOpen, setTopicsOpen] = useState(true); // 기본 열림

  // 임시 Topics 배열
  const topics = [
    { name: "Humour", icon: <FaRegLaugh className="mr-2" /> },
    { name: "Stock", icon: <FaChartLine className="mr-2" /> },
    { name: "Fashion", icon: <FaTshirt className="mr-2" /> },
    { name: "Music", icon: <FaMusic className="mr-2" /> },
    { name: "Film", icon: <FaFilm className="mr-2" /> },
    { name: "Game", icon: <FaGamepad className="mr-2" /> },
    { name: "Idol", icon: <FaUserAlt className="mr-2" /> },
    { name: "Job", icon: <FaBriefcase className="mr-2" /> },
  ];

  return (
    <aside className="w-64 bg-white p-4 border-r border-gray-200 h-full overflow-y-auto">
      <nav className="space-y-4 text-black">
        {/* 상단 항목 */}
        <div className="space-y-2">
          {/* Home */}
          <Link href="/" className="flex items-center p-2 rounded hover:bg-gray-100 text-sm">
            <FiHome className="mr-2" size={20} />
            <span>Home</span>
          </Link>

          {/* Contest (토글형 하위목록 포함) */}
          <div>
            <button
              onClick={() => setContestOpen(!isContestOpen)}
              className="flex w-full items-center p-2 rounded hover:bg-gray-100 focus:outline-none text-sm"
            >
              <FaTrophy className="mr-2" size={20} />
              <span>Contest</span>
              <span className="ml-auto">
                {isContestOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
              </span>
            </button>
            {isContestOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <Link href="/contest/sub1" className="block p-1 rounded hover:bg-gray-50 text-sm">
                  Sub Contest 1
                </Link>
                <Link href="/contest/sub2" className="block p-1 rounded hover:bg-gray-50 text-sm">
                  Sub Contest 2
                </Link>
              </div>
            )}
          </div>

          {/* Ask Me Anything (토글형 하위목록 포함) */}
          <div>
            <button
              onClick={() => setAskOpen(!isAskOpen)}
              className="flex w-full items-center p-2 rounded hover:bg-gray-100 focus:outline-none text-sm"
            >
              <FiHelpCircle className="mr-2" size={20} />
              <span>Ask Me Anything</span>
              <span className="ml-auto">
                {isAskOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
              </span>
            </button>
            {isAskOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <Link href="/ama/sub1" className="block p-1 rounded hover:bg-gray-50 text-sm">
                  Sub AMA 1
                </Link>
                <Link href="/ama/sub2" className="block p-1 rounded hover:bg-gray-50 text-sm">
                  Sub AMA 2
                </Link>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Topics 섹션 */}
        <div>
          <button
            onClick={() => setTopicsOpen(!isTopicsOpen)}
            className="flex w-full items-center p-2 rounded hover:bg-gray-100 focus:outline-none text-sm"
          >
            <span className="font-semibold">Topics</span>
            <span className="ml-auto">
              {isTopicsOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </span>
          </button>
          {isTopicsOpen && (
            <div className="ml-4 mt-1 space-y-1">
              {topics.map((topic) => (
                <Link
                  key={topic.name}
                  href={`/boards/${topic.name.toLowerCase()}`}
                  className="flex items-center p-1 rounded hover:bg-gray-50 text-sm"
                >
                  {topic.icon}
                  <span>{topic.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        {/* Winners 및 Best of */}
        <div className="space-y-2">
          <Link href="/winner-of-contest" className="flex items-center p-2 rounded hover:bg-gray-100 text-sm">
            <FaStar className="mr-2" size={16} />
            <span>Winner of the Contest</span>
          </Link>
          <Link href="/winner-of-month" className="flex items-center p-2 rounded hover:bg-gray-100 text-sm">
            <FaStar className="mr-2" size={16} />
            <span>Winner of the Month</span>
          </Link>
          <Link href="/best-of-project_a" className="flex items-center p-2 rounded hover:bg-gray-100 text-sm">
            <FaCrown className="mr-2" size={16} />
            <span>Best of Project_A</span>
          </Link>
        </div>

        <hr className="border-gray-200" />

        {/* Footer 링크 */}
        <div className="space-y-2 text-sm">
          <Link href="/project_a_rules" className="block p-2 rounded hover:bg-gray-100">
            Project_A_Rules
          </Link>
          <Link href="/privacy_policy" className="block p-2 rounded hover:bg-gray-100">
            Privacy_Policy
          </Link>
          <Link href="/user_agreement" className="block p-2 rounded hover:bg-gray-100">
            User Agreement
          </Link>
          <Link href="/contact" className="block p-2 rounded hover:bg-gray-100">
            Contact
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
