import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import HeaderUnLogin from '../components/headerUnLogin';
import HeaderLogin from '../components/headerLogin';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Prism from '../public/js/prism.js';
import Search from '../components/search';
import Contents from '../components/contents';
import { Archive, fetchArchives } from '../lib/archive';

const url = 'https://codearchives-server.dt.r.appspot.com';

interface ResponseState {
  type?: string;
  message: string | string[];
}

export default function Home({ data, token }: { data: Archive[]; token: string }) {
  const [archives, setArchives] = useState(data);

  const [response, setResponse] = useState<ResponseState>({
    type: '',
    message: '',
  });

  const { query } = useRouter();

  useEffect(() => {
    setResponse({ message: query.response });
    Prism.highlightAll();
  }, []);

  if (token === '') {
    return (
      <Layout home>
        <HeaderUnLogin />
        <div className="content">
          <p>{response.message}</p>
          <div className="Signin">
            <Link href="/signin">
              <a href="#" className="btn">
                Sign in
              </a>
            </Link>
            <div className="or">or</div>
            <Link href="/test-signin">
              <a href="#" className="btn">
                Test Sign in
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout home>
        <div className="header">
          <HeaderLogin />
        </div>
        <div className="content">
          <div>
            <p>{response.message}</p>
          </div>

          <section>
            <Search setArchives={setArchives} token={token} />
            <h2 className="font-bold text-2xl mt-4 -mb-3 ml-1">Archives</h2>
            {archives && <Contents archives={archives} />}

            {!archives && <div className="content">Empty</div>}
          </section>
        </div>
      </Layout>
    );
  }
}

export async function getServerSideProps({ req }) {
  const token = req.cookies.token || '';
  const data = await fetchArchives(token);
  return {
    props: {
      data,
      token,
    },
  };
}
