import Link from "next/link";
import { FiArrowUp, FiArrowDown, FiMessageCircle, FiShare } from "react-icons/fi";
import React from "react";

// 공통 카드 컴포넌트 스타일
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="border rounded-lg p-6 hover:shadow-lg transition bg-white">
    {children}
  </div>
);

// RankingCard: 1등, 2등, 3등 게시글 카드 (메타데이터 및 인터랙티브 요소 포함)
interface RankingCardProps {
  ranking: number;
  title: string;
  summary: string;
  meta: {
    time: string;
    views: number;
    upvotes: number;
    downvotes: number;
    comments: number;
  };
  poster: string;
}
const RankingCard = ({ ranking, title, summary, meta, poster }: RankingCardProps) => {
  return (
    <Card>
      <div className="flex items-center">
        {/* 랭킹 배지 */}
        <div className="flex-shrink-0 mr-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full text-lg font-bold">
            {ranking}
          </div>
        </div>
        {/* 게시글 내용 */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold">{title}</h3>
          <div className="text-sm text-gray-500 mt-1">Posted by {poster}</div>
          <p className="text-base text-gray-700 mt-2">{summary}</p>
          {/* 메타 데이터 */}
          <div className="mt-2 text-sm text-gray-500">
            {meta.time} · {meta.views.toLocaleString()} views · {meta.upvotes.toLocaleString()} Up_Vote · {meta.downvotes.toLocaleString()} Down_Vote
          </div>
          {/* 인터랙티브 버튼 */}
          <div className="flex items-center mt-3 space-x-4">
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              <FiArrowUp className="mr-1" /> Up_Vote
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              <FiArrowDown className="mr-1" /> Down_Vote
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              <FiMessageCircle className="mr-1" /> {meta.comments} Comments
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              <FiShare className="mr-1" /> Share
            </button>
          </div>
          <Link
            href={`/post/${ranking}`}
            className="block mt-3 text-blue-500 hover:underline text-sm"
          >
            Read more
          </Link>
        </div>
      </div>
    </Card>
  );
};

// AdvertisementCard: 광고 영역 (게시글 카드와 동일한 스타일)
const AdvertisementCard = () => {
  return (
    <div className="border rounded-lg h-48 flex items-center justify-center bg-gray-100">
      <span className="text-sm text-gray-600">Sponsored Advertisement</span>
    </div>
  );
};

// ContentFeed: 전체 중앙 컨텐츠 영역을 구성하는 피드 컴포넌트
export default function ContentFeed() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* 1등 게시글 */}
      <RankingCard
        ranking={1}
        title="1st Place: Top Post"
        summary="This top post stands out with amazing content and insightful analysis that captures the audience's attention."
        meta={{ time: "3 hours ago", views: 1234, upvotes: 256, downvotes: 50, comments: 34 }}
        poster="Alice"
      />
      {/* 2등 게시글 */}
      <RankingCard
        ranking={2}
        title="2nd Place: Great Insights"
        summary="This post offers great insights and detailed analysis on the latest trends, making it a must-read."
        meta={{ time: "5 hours ago", views: 987, upvotes: 180, downvotes: 30, comments: 22 }}
        poster="Bob"
      />
      {/* 3등 게시글 */}
      <RankingCard
        ranking={3}
        title="3rd Place: Informative Read"
        summary="This post provides informative content with a well-balanced mix of data and engaging commentary."
        meta={{ time: "1 day ago", views: 1500, upvotes: 300, downvotes: 70, comments: 40 }}
        poster="Charlie"
      />
      {/* 광고 카드 */}
      <AdvertisementCard />
      {/* 추가 데이터를 로딩하기 위한 'Load More' 버튼 */}
      <div className="text-center">
        <button className="px-4 py-2 border rounded hover:bg-gray-100 text-sm">
          Load More
        </button>
      </div>
    </div>
  );
}
