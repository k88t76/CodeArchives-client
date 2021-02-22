import React, { useState, useEffect } from 'react';
import HeaderUnLogin from '../components/headerUnLogin';
import HeaderLogin from '../components/headerLogin';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Prism from '../public/js/prism.js';
import Search from '../components/search';
import Contents from '../components/contents';
import { Archive, fetchArchives } from '../lib/archive';
import Form from '../components/form';
import Cookie from 'js-cookie';
import { fetchAuth } from '../lib/auth';

const url = 'https://codearchives-server.dt.r.appspot.com';

interface ResponseState {
  type: string | string[];
  message: string | string[];
}

export default function Home({ data, to }: { data: Archive[]; to: string }) {
  const [archives, setArchives] = useState(data);
  const [token, setToken] = useState(to);
  const [response, setResponse] = useState<ResponseState>({
    type: '',
    message: '',
  });

  const { query } = useRouter();

  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSignIn = async (e) => {
    e.preventDefault();
    const token = await fetchAuth(user, 'signin');
    console.log(token);
    if (token === 'Unknown User') {
      setResponse({
        type: 'error',
        message: 'The user is not registered',
      });
      setTimeout(() => {
        setResponse({
          type: '',
          message: '',
        });
      }, 3000);
    } else if (token === 'Wrong Password') {
      setResponse({
        type: 'error',
        message: 'The password is incorrect',
      });
      setTimeout(() => {
        setResponse({
          type: '',
          message: '',
        });
      }, 3000);
    } else {
      setResponse({ type: '', message: '' });
      Cookie.set('token', token, { expires: 1 / 24 });
      setToken(token);
      setArchives(await fetchArchives(token));
      Prism.highlightAll();
    }
  };

  useEffect(() => {
    setResponse({ type: query.type, message: query.response });
    setTimeout(() => {
      setResponse({
        type: '',
        message: '',
      });
    }, 3000);
    Prism.highlightAll();
  }, []);

  if (token === '') {
    return (
      <Layout>
        <HeaderUnLogin />
        <div className="content">
          <p className={`${response.type}`}>{response.message}</p>
          <Form path={'signin'} handleSubmit={handleSignIn} handleChange={handleChange} />
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="header">
          <HeaderLogin />
        </div>
        <div className="content">
          <p className={`${response.type}`}>{response.message}</p>

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
  const to: string = req.cookies.token || '';
  const data: Archive[] = await fetchArchives(to);
  return {
    props: {
      data,
      to,
    },
  };
}
