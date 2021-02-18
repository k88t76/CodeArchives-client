import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import Prism from '../public/js/prism.js';

export const siteTitle = 'CodeArchives';

export default function Layout({ children, home }: { children: React.ReactNode; home?: boolean }) {
  const handleBacktoHome = (e) => {
    e.preventDefault();
    setTimeout(Prism.highlightAll, 1);
    Router.push('/');
  };

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Code Archives is a web service for storing your codes" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div>
        <main>{children}</main>
      </div>
      {!home && (
        <div className="text-blue-600 hover:cursor-pointer">
          <p onClick={handleBacktoHome}>← Back to home</p>
        </div>
      )}
    </div>
  );
}
