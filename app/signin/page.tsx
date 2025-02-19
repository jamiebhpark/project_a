import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center mb-6">Sign In / Sign Up</h1>
        <p className="text-center text-gray-600 mb-8">
          Continue with your favorite social provider
        </p>
        <div className="space-y-4">
          {/* Apple Login */}
          <button className="flex items-center justify-center w-full py-3 px-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200 bg-black text-white">
            <Image src="/apple-logo.svg" alt="Apple" width={24} height={24} className="mr-3" />
            <span>Continue with Apple</span>
          </button>
          {/* Google Login */}
          <button className="flex items-center justify-center w-full py-3 px-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200 bg-white text-gray-700 border-gray-300">
            <Image src="/google-logo.svg" alt="Google" width={24} height={24} className="mr-3" />
            <span>Continue with Google</span>
          </button>
          {/* Kakao Login */}
          <button className="flex items-center justify-center w-full py-3 px-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200 bg-yellow-400 text-black">
            <Image src="/kakao-logo.svg" alt="Kakao" width={24} height={24} className="mr-3" />
            <span>Continue with Kakao</span>
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our&nbsp;
            <Link href="/terms" className="text-blue-500 hover:underline">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
