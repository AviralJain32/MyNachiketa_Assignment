
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow p-8 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-center mb-2">MyNachiketa Assignment</h1>
        <div className="text-center mb-6">
          <div className="text-lg font-semibold">Submitted by Aviral Jain</div>
          <div>Enrollment No. 20314802722</div>
          <div>College MAIT</div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Link href="/profile" className="bg-blue-600 text-white py-3 rounded text-lg font-medium text-center hover:bg-blue-700 transition">Profile</Link>
          <Link href="/leaderboards" className="bg-green-600 text-white py-3 rounded text-lg font-medium text-center hover:bg-green-700 transition">Leaderboards</Link>
          <Link href="/tounaments" className="bg-purple-600 text-white py-3 rounded text-lg font-medium text-center hover:bg-purple-700 transition">Tournaments</Link>
        </div>
      </div>
    </div>
  );
}
