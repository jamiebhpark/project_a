// 파일: app/terms/page.tsx
'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Project_A_Rules</h1>
      <div className="text-gray-700 leading-relaxed">
        <p>
          [여기에 Project_A_Rules의 실제 내용이 들어갑니다. 현재는 더미 텍스트로 시작합니다.]
        </p>
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="mt-6">
        <Link href="/" className="text-blue-500 hover:underline text-sm">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
