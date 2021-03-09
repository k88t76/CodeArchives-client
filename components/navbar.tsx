import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="flex flex-no-shrink text-white">
        <span className="font-extrabold ml-3 sm:text-2xl tracking-tight hover:cursor-pointer">Code Archives</span>
      </div>
      <div className="flex-grow"></div>
      <div>
        <a
          href="#"
          className="font-bold bg-gray-100 px-4 py-1.5 leading-none rounded text-black border  hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0"
        >
          ＋ Add Code
        </a>
        <Link href="/confirm">
          <a
            href="#"
            className="font-bold ml-4 px-4 py-1.5 bg-blue-600 leading-none rounded text-white hover:text-teal hover:bg-blue-500 border mt-4 lg:mt-0"
          >
            Sign Out
          </a>
        </Link>
      </div>
    </nav>
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

export default Navbar;
