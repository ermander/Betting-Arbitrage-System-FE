import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex gap-4">
        <Link href="/signin" className="text-blue-600 hover:text-blue-800">
          Sign In
        </Link>
        <Link href="/signup" className="text-blue-600 hover:text-blue-800">
          Sign Up
        </Link>
      </nav>
    </div>
  );
}
