import React, { useState, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import HeaderUnLogin from '../components/headerUnLogin';
import HeaderLogin from '../components/headerLogin';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Prism from '../public/js/prism.js';
import Search from '../components/search';
import Contents from '../components/contents';
import Sidebar from '../components/sidebar';
import { Archive, fetchArchives } from '../lib/archive';
import Form from '../components/form';
import { fetchAuth, fetchCookie } from '../lib/auth';

//const url = 'https://codearchives-server.dt.r.appspot.com';
const url = 'http://localhost:8080';

interface Props {
  data: Archive[];
  to: string;
}

interface ResponseState {
  type: string | string[];
  message: string | string[];
}

const Home: NextPage<Props> = ({ data, to }) => {
  const [archives, setArchives] = useState(data);
  const [token, setToken] = useState(to);
  const [c, setC] = useState('');
  const handleSetCookie = async () => {};
  const handleGetCookie = async () => {
    setC(await fetchCookie());
  };

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
      //Cookie.set('token', token, { expires: 1 / 24 });
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
        <div className="flex">
          {archives && <Sidebar archives={archives} />}

          <div className="content">
            <p className={`${response.type}`}>{response.message}</p>

            <section>
              {
                <div className="flex mt-6">
                  <p>{`Cookie.Value: ${c}`}</p>

                  <span className="btn" onClick={handleSetCookie}>
                    setCookie
                  </span>
                  <span className="btn" onClick={handleGetCookie}>
                    getCookie
                  </span>
                </div>
              }

              <div className="flex-grow"></div>
              <span className="flex mr-12"></span>
              <Search setArchives={setArchives} token={token} />
              <div className="pt-12">{archives && <Contents archives={archives} />}</div>
              {!archives && <div className="content">Empty</div>}
            </section>
          </div>
        </div>
      </Layout>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  const to: string = (await fetchCookie()) || '';
  const data: Archive[] = await fetchArchives(to);
  return {
    props: {
      data,
      to,
    },
  };
};

export default Home;
