import Head from 'next/head';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import React, { memo, ReactNode, useState } from 'react';
import { Loading } from '../atoms/Loading';

export const siteTitle = 'CodeArchives';

interface Props {
  children: ReactNode;
}

export const SignInLayout: React.VFC<Props> = memo(({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  const handleBacktoHome = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (router.pathname === '/') {
      setIsLoading(false);
    }
    router.push('/');
  };

  const handleAddCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (router.pathname === '/new') {
      setIsLoading(false);
    }
    router.push('/new');
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
      <main>{children}</main>
    </>
  );
});
