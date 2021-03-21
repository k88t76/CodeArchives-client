import Link from 'next/link';
import React, { memo, ReactNode, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { Loading } from '../atoms/Loading';
import Head from 'next/head';

export const siteTitle = 'CodeArchives';

interface Props {
  children: ReactNode;
}

export const UnSignInLayout: React.VFC<Props> = memo(({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  const handleBackToHome = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (router.pathname === '/') {
      setIsLoading(false);
    }
    router.push('/');
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Code Archives</title>
        <meta name="description" content="Code Archives is a web service to store your codes" />
      </Head>
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
      <main>{children}</main>
    </>
  );
});
