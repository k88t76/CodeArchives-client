import Link from 'next/link';
import React, { useState } from 'react';
import Router, { NextRouter, useRouter } from 'next/router';
import Loading from '../components/loading';

const HeaderUnLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  const handleBackToHome = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (router.pathname === '/') {
      setIsLoading(false);
    }
    Router.push('/');
  };

  const handlePath = () => {
    if (router.pathname === '/') {
      return '/signup';
    } else {
      return '/';
    }
  };

  const handleButton = () => {
    if (router.pathname === '/') {
      return 'Sign Up';
    } else {
      return 'Sign In';
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="header">
        <div className="flex items-center text-white">
          <span
            onClick={handleBackToHome}
            className="font-extrabold ml-3 sm:text-2xl tracking-tight hover:cursor-pointer"
          >
            Code Archives
          </span>
        </div>
        <div className="flex-grow"></div>
        <Link href={router.pathname === '/' ? '/signup' : '/'}>
          <a
            href="#"
            className="text-xl text-center py-1 w-28 bg-blue-600  rounded text-white hover:bg-blue-700 border"
          >
            {router.pathname === '/' ? 'Sign Up' : 'Sign In'}
          </a>
        </Link>
      </div>
    </>
  );
};

export default HeaderUnLogin;
