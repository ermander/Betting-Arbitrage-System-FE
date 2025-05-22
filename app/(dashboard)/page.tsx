import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <Link href="/signin">Sign In</Link>
      <Link href="/signup">Sign Up</Link>
    </div>
  );
}
