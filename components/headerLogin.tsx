import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import Prism from '../public/js/prism.js';

const HeaderLogin: React.FC = () => {
  const handleBacktoHome = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTimeout(Prism.highlightAll, 0);
    Router.push('/');
  };
  return (
    <>
      <div className="flex items-center text-white">
        <span
          onClick={handleBacktoHome}
          className="font-extrabold ml-3 sm:text-2xl tracking-tight hover:cursor-pointer"
        >
          Code Archives
        </span>
      </div>
      <div className="flex-grow"></div>
      <div>
        <Link href="/new">
          <a
            href="#"
            className="font-bold text-xl bg-gray-100 px-4 py-1.5 leading-none rounded text-black hover:bg-white"
          >
            ＋ Add Code
          </a>
        </Link>
        <Link href="/confirm">
          <a
            href="#"
            className="text-xl ml-4 px-3 py-1.5 bg-blue-600 leading-none rounded text-white hover:bg-blue-500 border"
          >
            Sign Out
          </a>
        </Link>
      </div>
    </>
    /*
      <div className="header">
        <div className="text-center hover:cursor-pointer">
          <p onClick={handleBacktoHome} className="logo">
            Code Archives
          </p>
        </div>
        <Link href="/new">
          <a className="btn ">Add Code</a>
        </Link>
        <Link href="/confirm">
          <a className="btn ">Sign out</a>
        </Link>
      </div>
      */
  );
};

export default HeaderLogin;
