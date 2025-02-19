'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { FiArrowUp, FiArrowDown, FiMessageCircle, FiShare } from 'react-icons/fi';

// 차트 등록
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

// 게시글 및 댓글 인터페이스
interface Post {
  id: number;
  title: string;
  content: string;
  postedBy: string;
  time: string;
  upvotes: number;
  downvotes: number;
  views: number;
  mediaUrl?: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  content: string;
  time: string;
}

// 더미 데이터 예시
const dummyPost: Post = {
  id: 1,
  title: "Sample Post Title",
  content:
    "This is the detailed content of the post. It includes insightful analysis and comprehensive information. Users can read the full post along with additional media and comments.",
  postedBy: "Alice",
  time: "3 hours ago",
  upvotes: 300,
  downvotes: 50,
  views: 1200,
  mediaUrl: "https://via.placeholder.com/600x300",
  comments: [
    { id: 1, author: "Bob", content: "Great post! Really enjoyed it.", time: "2 hours ago" },
    { id: 2, author: "Charlie", content: "I totally agree with your points.", time: "1 hour ago" },
  ],
};

export default function PostDetailPage() {
  // postId 변수 제거: dummyPost를 사용
  const [upvotes, setUpvotes] = useState(dummyPost.upvotes);
  const [downvotes, setDownvotes] = useState(dummyPost.downvotes);
  const [views] = useState(dummyPost.views);
  const post = { ...dummyPost, upvotes, downvotes };

  // Distribution 토글 상태
  const [showDistribution, setShowDistribution] = useState(false);

  // 파이 차트 데이터 (Up_Vote / Down_Vote 분포)
  const pieData = {
    labels: ['Up_Vote', 'Down_Vote'],
    datasets: [
      {
        data: [post.upvotes, post.downvotes],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#EF5350'],
      },
    ],
  };

  // 라인 차트 데이터 (최근 6시간 동안의 View 추세 예시)
  const lineData = {
    labels: ['6h ago', '5h ago', '4h ago', '3h ago', '2h ago', '1h ago'],
    datasets: [
      {
        label: 'View Trend',
        data: [800, 900, 1000, 1100, 1150, views],
        fill: false,
        borderColor: '#2196F3',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 게시글 헤더 */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="text-sm text-gray-500 flex items-center">
          <span>Posted by {post.postedBy} · {post.time}</span>
          <span className="ml-2 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
            Trending
          </span>
        </div>
      </div>
      
      {/* 첨부 이미지/미디어 */}
      {post.mediaUrl && (
        <div className="mb-4">
          <Image
            src={post.mediaUrl}
            alt="Post media"
            width={600}
            height={300}
            className="w-full rounded"
          />
        </div>
      )}
      
      {/* 게시글 본문 */}
      <div className="mb-4 text-base text-gray-800">
        {post.content}
      </div>
      
      {/* 인터랙티브 버튼 영역 */}
      <div className="flex items-center space-x-6 mb-4">
        <button
          onClick={() => setUpvotes(upvotes + 1)}
          className="flex items-center text-gray-600 hover:text-blue-500"
        >
          <FiArrowUp className="mr-1" size={18} />
          <span>Up_Vote</span>
          <span className="ml-1">{upvotes}</span>
        </button>
        <button
          onClick={() => setDownvotes(downvotes + 1)}
          className="flex items-center text-gray-600 hover:text-blue-500"
        >
          <FiArrowDown className="mr-1" size={18} />
          <span>Down_Vote</span>
          <span className="ml-1">{downvotes}</span>
        </button>
        <button className="flex items-center text-gray-600 hover:text-blue-500">
          <FiMessageCircle className="mr-1" size={18} />
          <span>Comments</span>
          <span className="ml-1">{post.comments.length}</span>
        </button>
        <button className="flex items-center text-gray-600 hover:text-blue-500">
          <FiShare className="mr-1" size={18} />
          <span>Share</span>
        </button>
      </div>
      
      {/* Distribution 토글 버튼 */}
      <div className="mb-4">
        <button
          onClick={() => setShowDistribution(!showDistribution)}
          className="px-4 py-2 border rounded hover:bg-gray-100 text-sm"
        >
          {showDistribution ? 'Hide Distribution' : 'Show Distribution'}
        </button>
      </div>
      
      {/* Distribution 차트 영역: 작은 크기로 가로 2개 배치 */}
      {showDistribution && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-1/2 h-48">
            <h2 className="text-lg font-bold mb-2">Vote Distribution</h2>
            <div className="p-2 border rounded bg-white h-full">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-48">
            <h2 className="text-lg font-bold mb-2">View Trend</h2>
            <div className="p-2 border rounded bg-white h-full">
              <Line data={lineData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      )}
      
      {/* 댓글 섹션 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        {post.comments.map((comment) => (
          <div key={comment.id} className="border-b py-2">
            <div className="text-sm font-semibold">
              {comment.author} <span className="text-gray-500">· {comment.time}</span>
            </div>
            <div className="text-sm text-gray-700">{comment.content}</div>
          </div>
        ))}
      </div>
      
      {/* 뒤로가기 링크 */}
      <div>
        <Link href="/boards/humour" className="text-blue-500 hover:underline text-sm">
          Back to Humour Board
        </Link>
      </div>
    </div>
  );
}
