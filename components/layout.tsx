import Head from 'next/head';

export const siteTitle = 'CodeArchives';

export default function Layout({ children }: { children: React.ReactNode }) {
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
}
