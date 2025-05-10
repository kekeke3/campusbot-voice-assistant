// pages/index.tsx
import { FiMic } from 'react-icons/fi';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold text-blue-600 mt-8">Welcome to CampusBot</h1>
      <p className="mt-2 text-gray-500">Your voice-powered campus assistant</p>

      <div className="mt-12 flex flex-col items-center space-y-4">
        <button className="w-24 h-24 flex items-center justify-center bg-blue-100 rounded-full shadow-md hover:shadow-lg transition">
          <FiMic className="text-4xl text-blue-600" />
        </button>
        <span className="text-gray-500">Tap to speak</span>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 w-full max-w-md text-center">
        <Link href="/profile" className="p-4 bg-gray-100 rounded-xl shadow hover:bg-gray-200">
          Profile
        </Link>
        <Link href="/announcements" className="p-4 bg-gray-100 rounded-xl shadow hover:bg-gray-200">
          Announcements
        </Link>
        <Link href="/schedule" className="p-4 bg-gray-100 rounded-xl shadow hover:bg-gray-200">
          Schedule
        </Link>
        <Link href="/grades" className="p-4 bg-gray-100 rounded-xl shadow hover:bg-gray-200">
          Grades
        </Link>
      </div>
    </div>
  );
}
