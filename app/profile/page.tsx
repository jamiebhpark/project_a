// 파일: app/profile/page.tsx
'use client';

import Link from 'next/link';

export default function ProfilePage() {
  // 더미 사용자 데이터
  const user = {
    name: 'Alice',
    email: 'alice@example.com',
    bio: 'Passionate about technology and design.',
    posts: [
      { id: 1, title: 'My first post', date: '2024-02-10' },
      { id: 2, title: 'Thoughts on design', date: '2024-02-12' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Dashboard</h1>
      <div className="mb-6 p-4 border rounded bg-white shadow">
        <h2 className="text-xl font-bold mb-2">Profile</h2>
        <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-700"><strong>Bio:</strong> {user.bio}</p>
      </div>
      <div className="p-4 border rounded bg-white shadow">
        <h2 className="text-xl font-bold mb-2">My Posts</h2>
        <ul>
          {user.posts.map(post => (
            <li key={post.id} className="mb-2">
              <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
                {post.title}
              </Link>
              <span className="text-gray-500 text-sm ml-2">({post.date})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
