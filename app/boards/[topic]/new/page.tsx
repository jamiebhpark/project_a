'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [showMedia, setShowMedia] = useState(false);
  const [showLink, setShowLink] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 게시글 등록 API 연동 로직 등을 처리합니다.
    console.log('Post submitted', { title, content, mediaUrl, linkUrl });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 제목 입력 */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* 본문 입력 */}
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post here..."
            required
            rows={8}
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>
        {/* 미디어 / 링크 첨부 토글 버튼 */}
        <div className="flex space-x-4">
          <button 
            type="button" 
            onClick={() => setShowMedia(!showMedia)}
            className="px-3 py-2 border rounded hover:bg-gray-100 text-sm"
          >
            {showMedia ? 'Remove Media' : 'Add Media'}
          </button>
          <button 
            type="button" 
            onClick={() => setShowLink(!showLink)}
            className="px-3 py-2 border rounded hover:bg-gray-100 text-sm"
          >
            {showLink ? 'Remove Link' : 'Add Link'}
          </button>
        </div>
        {/* 미디어 URL 입력 (선택 사항) */}
        {showMedia && (
          <div>
            <label className="block text-sm font-medium mb-1">Media URL</label>
            <input 
              type="url"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="Enter image or video URL"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        )}
        {/* 링크 URL 입력 (선택 사항) */}
        {showLink && (
          <div>
            <label className="block text-sm font-medium mb-1">Link URL</label>
            <input 
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter link URL"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        )}
        {/* 버튼 그룹 */}
        <div className="flex space-x-4 mt-4">
          <button type="button" className="px-4 py-2 border rounded hover:bg-gray-100 text-sm">
            Preview
          </button>
          <button type="button" className="px-4 py-2 border rounded hover:bg-gray-100 text-sm">
            Save Draft
          </button>
          <button type="button" className="px-4 py-2 border rounded hover:bg-gray-100 text-sm">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
            Post
          </button>
        </div>
      </form>
      {/* 게시판으로 돌아가기 링크 */}
      <div className="mt-4">
        <Link href="/boards/humour" className="text-blue-500 hover:underline text-sm">
          Back to Humour Board
        </Link>
      </div>
    </div>
  );
}
