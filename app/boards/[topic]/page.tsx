'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaTrophy, FaFire, FaLightbulb } from 'react-icons/fa';

interface Post {
  id: number;
  title: string;
  summary: string;
  postedBy: string;
  time: string;
  views: number;
  upvotes: number;
  downvotes: number;
  comments: number;
}

const dummyTopPosts: Post[] = [
  { id: 1, title: 'Top Post 1', summary: 'Summary for top post 1', postedBy: 'Alice', time: '2 hours ago', views: 1200, upvotes: 300, downvotes: 20, comments: 15 },
  { id: 2, title: 'Top Post 2', summary: 'Summary for top post 2', postedBy: 'Bob', time: '3 hours ago', views: 1100, upvotes: 280, downvotes: 25, comments: 10 },
  { id: 3, title: 'Top Post 3', summary: 'Summary for top post 3', postedBy: 'Charlie', time: '4 hours ago', views: 1000, upvotes: 250, downvotes: 30, comments: 12 },
];

const dummyHotPosts: Post[] = [
  { id: 4, title: 'Hot Post 1', summary: 'Summary for hot post 1', postedBy: 'Diana', time: '1 hour ago', views: 900, upvotes: 220, downvotes: 15, comments: 20 },
  { id: 5, title: 'Hot Post 2', summary: 'Summary for hot post 2', postedBy: 'Eve', time: '2 hours ago', views: 850, upvotes: 210, downvotes: 10, comments: 18 },
  { id: 6, title: 'Hot Post 3', summary: 'Summary for hot post 3', postedBy: 'Frank', time: '30 minutes ago', views: 800, upvotes: 200, downvotes: 12, comments: 22 },
  { id: 7, title: 'Hot Post 4', summary: 'Summary for hot post 4', postedBy: 'Grace', time: '1.5 hours ago', views: 750, upvotes: 190, downvotes: 18, comments: 16 },
  { id: 8, title: 'Hot Post 5', summary: 'Summary for hot post 5', postedBy: 'Heidi', time: '2.5 hours ago', views: 700, upvotes: 180, downvotes: 14, comments: 19 },
];

const dummyNewPosts: Post[] = [
  { id: 9, title: 'New Post 1', summary: 'Brief summary for new post 1', postedBy: 'Ivy', time: '10 minutes ago', views: 300, upvotes: 80, downvotes: 5, comments: 3 },
  { id: 10, title: 'New Post 2', summary: 'Brief summary for new post 2', postedBy: 'Jack', time: '20 minutes ago', views: 350, upvotes: 90, downvotes: 6, comments: 4 },
  { id: 11, title: 'New Post 3', summary: 'Brief summary for new post 3', postedBy: 'Kate', time: '30 minutes ago', views: 400, upvotes: 100, downvotes: 7, comments: 5 },
  // 최대 30개까지 확장 예정
];

type TabOption = 'top' | 'hot' | 'new';

//
// 탭별 카드 컴포넌트
//

const TopPostCard = ({ post }: { post: Post }) => (
  <div className="relative border rounded-lg p-4 hover:shadow-md transition bg-white">
    <div className="absolute top-0 left-0 bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded-br-lg">
      TOP
    </div>
    <div className="ml-12">
      <h3 className="text-xl font-bold">{post.title}</h3>
      <div className="text-sm text-gray-500 mt-1">Posted by {post.postedBy}</div>
      <p className="text-base text-gray-700 mt-2">{post.summary}</p>
      <div className="mt-2 text-sm text-gray-500">
        {post.time} · {post.views.toLocaleString()} views · {post.upvotes.toLocaleString()} Up_Vote · {post.downvotes.toLocaleString()} Down_Vote
      </div>
      <Link href={`/post/${post.id}`} className="block mt-2 text-blue-500 hover:underline text-sm">
        Read more
      </Link>
    </div>
  </div>
);

const HotPostCard = ({ post }: { post: Post }) => (
  <div className="relative border rounded-lg p-4 hover:shadow-md transition bg-white">
    <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-br-lg">
      HOT
    </div>
    <div className="ml-12">
      <h3 className="text-xl font-bold">{post.title}</h3>
      <div className="text-sm text-gray-500 mt-1">Posted by {post.postedBy}</div>
      <p className="text-base text-gray-700 mt-2">{post.summary}</p>
      <div className="mt-2 text-sm text-gray-500">
        {post.time} · {post.views.toLocaleString()} views · {post.upvotes.toLocaleString()} Up_Vote · {post.downvotes.toLocaleString()} Down_Vote
      </div>
      <Link href={`/post/${post.id}`} className="block mt-2 text-blue-500 hover:underline text-sm">
        Read more
      </Link>
    </div>
  </div>
);

const NewPostCard = ({ post }: { post: Post }) => (
  <div className="relative border rounded-lg p-4 hover:shadow-sm transition bg-white flex items-center">
    <div className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-br-lg">
      NEW
    </div>
    <div className="flex-1 pl-12">
      <h3 className="text-lg font-bold">{post.title}</h3>
      <div className="text-xs text-gray-500 mt-1">Posted by {post.postedBy} · {post.time}</div>
    </div>
    <Link href={`/post/${post.id}`} className="ml-4 text-blue-500 hover:underline text-sm">
      Read
    </Link>
  </div>
);

//
// 탭 콘텐츠 컴포넌트
//

const TopPosts = () => (
  <div className="space-y-4">
    {dummyTopPosts.map((post) => (
      <TopPostCard key={post.id} post={post} />
    ))}
  </div>
);

const HotPosts = () => (
  <div className="space-y-4">
    {dummyHotPosts.map((post) => (
      <HotPostCard key={post.id} post={post} />
    ))}
  </div>
);

const NewPosts = () => (
  <div className="space-y-4">
    {dummyNewPosts.map((post) => (
      <NewPostCard key={post.id} post={post} />
    ))}
  </div>
);

//
// BoardPage 컴포넌트
//
export default function BoardPage() {
  const params = useParams();
  const topic = params.topic as string;
  const boardTitle = topic.charAt(0).toUpperCase() + topic.slice(1);

  const [activeTab, setActiveTab] = useState<TabOption>('top');

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Board Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{boardTitle} Board</h1>
        <Link href={`/boards/${topic}/new`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Post
        </Link>
      </div>
      
      {/* Tabs with icons */}
      <div className="flex space-x-4 mb-4 border-b pb-2">
        <button 
          className={`flex items-center space-x-1 pb-2 ${activeTab === 'top' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('top')}
        >
          <FaTrophy className="inline" />
          <span>Top 3</span>
        </button>
        <button 
          className={`flex items-center space-x-1 pb-2 ${activeTab === 'hot' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('hot')}
        >
          <FaFire className="inline" />
          <span>Hot 5</span>
        </button>
        <button 
          className={`flex items-center space-x-1 pb-2 ${activeTab === 'new' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('new')}
        >
          <FaLightbulb className="inline" />
          <span>New 30</span>
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'top' && <TopPosts />}
        {activeTab === 'hot' && <HotPosts />}
        {activeTab === 'new' && <NewPosts />}
      </div>
    </div>
  );
}
