"use client";

import Link from "next/link";
import { useEffect } from "react";
// No need for motion in the error component

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Profile page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md w-full text-center border border-white/20 shadow-lg">
        <div className="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
        <p className="text-purple-100 mb-6">We couldn't load this profile. Please try again later.</p>
        
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium border border-white/20 shadow-lg"
          >
            Try again
          </button>
          
          <Link href="/" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium shadow-lg">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}