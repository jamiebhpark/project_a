'use client';

import { useState } from 'react';
import { FiImage, FiVideo, FiLink } from 'react-icons/fi';

interface NewCommentFormProps {
  onSubmit: (content: string, imageFile?: File, gifUrl?: string, linkUrl?: string) => void;
  onCancel?: () => void;
}

export function NewCommentForm({ onSubmit, onCancel }: NewCommentFormProps) {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [gifUrl, setGifUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content, imageFile || undefined, gifUrl || undefined, linkUrl || undefined);
    setContent('');
    setImageFile(null);
    setGifUrl('');
    setLinkUrl('');
    setIsFocused(false);
  };

  const handleCancel = () => {
    setContent('');
    setImageFile(null);
    setGifUrl('');
    setLinkUrl('');
    setIsFocused(false);
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="relative border rounded p-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="join the conversation..."
        className="w-full resize-none border-none outline-none"
        rows={isFocused ? 4 : 1}
        onFocus={() => setIsFocused(true)}
      />
      {isFocused && (
        <div className="mt-2 flex items-center justify-between">
          {/* 왼쪽: 첨부 옵션 아이콘 */}
          <div className="flex space-x-3">
            <label htmlFor="imageUpload" className="cursor-pointer text-gray-600 hover:text-blue-500">
              <FiImage size={18} />
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button
              type="button"
              onClick={() => {
                const url = prompt("Enter GIF URL:");
                if (url) setGifUrl(url);
              }}
              className="text-gray-600 hover:text-blue-500"
              title="Attach GIF (coming soon)"
            >
              <FiVideo size={18} />
            </button>
            <button
              type="button"
              onClick={() => {
                const url = prompt("Enter URL:");
                if (url) setLinkUrl(url);
              }}
              className="text-gray-600 hover:text-blue-500"
              title="Attach URL"
            >
              <FiLink size={18} />
            </button>
          </div>
          {/* 오른쪽: 버튼 그룹 */}
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
