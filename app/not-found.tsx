import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md w-full text-center border border-white/20 shadow-lg">
        <div className="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">Profile Not Found</h1>
        <p className="text-purple-100 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
        
        <Link href="/">
          <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium shadow-lg flex items-center gap-2 mx-auto">
            <span>Create Your Own Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}