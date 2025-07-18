"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthError() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              "Unable to sign in"
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              "An unexpected error occurred during sign in. Please try again."
            </p>

            <div className="space-y-4">
              <Link
                href="/auth/signin"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
