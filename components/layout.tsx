import Head from 'next/head';
import React from 'react';

export const siteTitle = 'CodeArchives';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Code Archives</title>
        <meta name="description" content="Code Archives is a web service to store your codes" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
