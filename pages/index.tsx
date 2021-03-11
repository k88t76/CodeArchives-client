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
import Cookie from 'js-cookie';
import { Archive, fetchArchives } from '../lib/archive';
import Form from '../components/form';
import { fetchAuth, setCookie } from '../lib/auth';

interface Props {
  data: Archive[];
  to: string;
}

interface ResponseState {
  type: string | string[];
  message: string | string[];
}

const Home: NextPage<any> = ({ cookies, data }) => {
  const [archives, setArchives] = useState([]);
  const [token, setToken] = useState(cookies);
  const [c, setC] = useState(cookies);
  const handleSetCookie = async () => {
    setCookie(token);
  };
  const handleGetCookie = async () => {
    //setC(await getCookie());
    console.log('cookie', cookies);
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
      Cookie.set('cookie', token, { expires: 1 });
      setToken(token);
      //setCookie(token);
      setC(token);
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.cookies.cookie || '';
  const data: Archive[] = await fetchArchives(cookies);
  return {
    props: {
      cookies,
      data,
    },
  };
};

export default Home;
