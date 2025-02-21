'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface ExtendedComment {
  id: number;
  author: string;
  content: string;
  time: string;
  upvotes: number;
  downvotes: number;
  imageFile?: File;
  gifUrl?: string;
  linkUrl?: string;
  replies?: ExtendedComment[];
}
/* eslint-enable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import { FiArrowUp, FiArrowDown, FiShare } from 'react-icons/fi';
import { NewCommentForm } from './NewCommentForm';

interface CommentItemProps {
  comment: ExtendedComment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState<ExtendedComment[]>(comment.replies || []);
  const [upvoteCount, setUpvoteCount] = useState(comment.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(comment.downvotes);

  const addReply = (
    content: string,
    imageFile?: File,
    gifUrl?: string,
    linkUrl?: string
  ) => {
    const newReply: ExtendedComment = {
      id: Date.now(),
      author: "CurrentUser", // 실제 로그인 사용자 정보로 대체
      content,
      time: "Just now",
      upvotes: 0,
      downvotes: 0,
    };
    setReplies([newReply, ...replies]);
    setShowReplyForm(false);
  };

  return (
    <div className="pl-4 border-l">
      <div className="pb-2">
        <div className="text-sm font-semibold">
          {comment.author} <span className="text-gray-500">· {comment.time}</span>
        </div>
        <div className="text-sm text-gray-700">{comment.content}</div>
        <div className="flex items-center space-x-3 mt-1">
          <button
            onClick={() => setUpvoteCount(upvoteCount + 1)}
            className="flex items-center text-gray-600 hover:text-blue-500 text-xs"
          >
            <FiArrowUp className="mr-1" size={14} />
            <span>Up_Vote ({upvoteCount})</span>
          </button>
          <button
            onClick={() => setDownvoteCount(downvoteCount + 1)}
            className="flex items-center text-gray-600 hover:text-blue-500 text-xs"
          >
            <FiArrowDown className="mr-1" size={14} />
            <span>Down_Vote ({downvoteCount})</span>
          </button>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center text-gray-600 hover:text-blue-500 text-xs"
          >
            <span>Reply ({replies.length})</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-500 text-xs">
            <FiShare className="mr-1" size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>
      {showReplyForm && (
        <div className="mb-2">
          <NewCommentForm onSubmit={addReply} onCancel={() => setShowReplyForm(false)} />
        </div>
      )}
      {replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
