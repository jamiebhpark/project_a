'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
import { usePost, Comment } from '../../hooks/usePost';
import { NewCommentForm } from '../../../components/NewCommentForm';
import { CommentItem, ExtendedComment } from '../../../components/CommentItem';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.postId as string;

  const { data: post, isLoading, error } = usePost(postId);

  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [showDistribution, setShowDistribution] = useState(false);
  const [comments, setComments] = useState<ExtendedComment[]>([]);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    if (post) {
      setUpvotes(post.upvotes);
      setDownvotes(post.downvotes);
      // 각 댓글에 기본적으로 upvotes, downvotes 0 할당 (ExtendedComment로 변환)
      setComments(post.comments.map(c => ({ ...c, upvotes: 0, downvotes: 0 })));
    }
  }, [post]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error || !post) return <div className="text-center mt-10">Error loading post.</div>;

  const pieData = {
    labels: ['Up_Vote', 'Down_Vote'],
    datasets: [
      {
        data: [upvotes, downvotes],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#EF5350'],
      },
    ],
  };

  const lineData = {
    labels: ['6h ago', '5h ago', '4h ago', '3h ago', '2h ago', '1h ago'],
    datasets: [
      {
        label: 'View Trend',
        data: [800, 900, 1000, 1100, 1150, post.views],
        fill: false,
        borderColor: '#2196F3',
        tension: 0.1,
      },
    ],
  };

  const addNewComment = (
    content: string,
    imageFile?: File,
    gifUrl?: string,
    linkUrl?: string
  ) => {
    const newComment: ExtendedComment = {
      id: Date.now(),
      author: "CurrentUser", // 실제 로그인 사용자 정보로 대체
      content,
      time: "Just now",
      upvotes: 0,
      downvotes: 0,
    };
    setComments([newComment, ...comments]);
    setShowCommentForm(false);
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
        <button
          onClick={() => setShowCommentForm(!showCommentForm)}
          className="flex items-center text-gray-600 hover:text-blue-500"
        >
          <FiMessageCircle className="mr-1" size={18} />
          <span>Comments</span>
          <span className="ml-1">{comments.length}</span>
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
      
      {/* Distribution 차트 영역 */}
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
      
      {/* Comments 섹션 */}
      <div className="mb-6 pt-6 border-t">
        {/* 댓글 작성 폼을 댓글 섹션 최상단에 표시 */}
        {showCommentForm && (
          <NewCommentForm onSubmit={addNewComment} onCancel={() => setShowCommentForm(false)} />
        )}
        <div className="space-y-4 mt-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
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
