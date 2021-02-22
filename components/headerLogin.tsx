import Link from 'next/link';
import Router from 'next/router';
import Prism from '../public/js/prism.js';

export default function HeaderLogin() {
  const handleBacktoHome = (e) => {
    e.preventDefault();
    setTimeout(Prism.highlightAll, 1);
    Router.push('/');
  };
  return (
    <div className="header">
      <div className="text-center hover:cursor-pointer">
        <p onClick={handleBacktoHome} className="logo">
          Code Archives
        </p>
      </div>
      <Link href="/new">
        <a className="btn">Add Code</a>
      </Link>
      <Link href="/confirm">
        <a className="btn">Sign out</a>
      </Link>
    </div>
  );
}
