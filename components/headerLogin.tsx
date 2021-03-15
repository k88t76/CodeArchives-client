import Link from 'next/link';
import Router, { NextRouter, useRouter } from 'next/router';
import React, { useState } from 'react';
import Loading from '../components/loading';
import Prism from '../public/js/prism.js';

const HeaderLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  const handleBacktoHome = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (router.pathname === '/') {
      setIsLoading(false);
    }
    Router.push('/');
  };

  const handleAddCode = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (router.pathname === '/new') {
      setIsLoading(false);
    }
    Router.push('/new');
  };
  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="header">
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
          <button
            onClick={handleAddCode}
            className="font-bold text-xl bg-gray-100 px-4 py-1.5 leading-none rounded-md text-black hover:bg-white"
          >
            ＋ Add Code
          </button>
          <Link href="/confirm">
            <a
              href="#"
              className="text-xl ml-4 px-3 py-1 w-28 bg-blue-600 leading-none rounded-md text-white hover:bg-blue-700 border"
            >
              Sign Out
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeaderLogin;
