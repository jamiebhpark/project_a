// 파일: app/not-found.tsx
'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">500 - Internal Server Error</h1>
      <p className="text-gray-600 mb-8">The server encountered an internal error or misconfiguration and was unable to complete your request.</p>
      <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go Home
      </Link>
    </div>
  );
}
