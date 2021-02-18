import Link from 'next/link';

export default function Header() {
  return (
    <div className="header">
      <Link href="/">
        <a className="logo">Code Archives</a>
      </Link>
      <Link href="/signup">
        <a href="#" className="btn">
          Sign up
        </a>
      </Link>
    </div>
  );
}
