import React, { useState, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
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
import { fetchAuth, fetchCookie } from '../lib/auth';

const url = 'https://codearchives-server.dt.r.appspot.com';

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
  const handleSetCookie = async () => {
    fetchCookie('set');
  };
  const handleGetCookie = async () => {
    setC(await fetchCookie('get'));
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
        <div className="flex w-screen">
          <aside className="bg-gray-100 sm:block hidden h-screen sticky top-0">
            <div className="flex text-2xl font-bold ml-8 mt-16 mb-2">
              <p> Archives</p>
            </div>
            <nav className="ml-8 mr-12 font-semibold">
              <a className="flex w-40 py-2 text-gray-700" href="#">
                {'server.go'}
              </a>
              <a className="-mt-2 flex py-2 text-gray-600" href="#">
                {'async.rs'}
              </a>
            </nav>
          </aside>

          <div className="content">
            <p className={`${response.type}`}>{response.message}</p>

            <section>
              <div className="flex items-center pr-8 pl-3 fixed z-50 w-full h-14 ml-2 mt-2 bg-white">
                <p>{`Cookie.Value: ${c}`}</p>
                <span className="btn" onClick={handleSetCookie}>
                  setCookie
                </span>
                <span className="btn" onClick={handleGetCookie}>
                  getCookie
                </span>

                <div className="flex-grow"></div>
                <span className="flex mr-12"></span>
                <Search setArchives={setArchives} token={token} />
                <a
                  href="#"
                  className="font-bold ml-4 md:inline-block hidden bg-gray-100 px-4 py-1.5 leading-none rounded text-black border  hover:border-transparent hover:text-teal hover:bg-white"
                >
                  🪟
                </a>
                <a
                  href="#"
                  className="font-bold px-4 py-1.5 md:inline-block hidden mr-60 bg-blue-600 leading-none rounded text-white hover:text-teal hover:bg-blue-500 border"
                >
                  🔳
                </a>
              </div>
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
  const to: string = req.cookies.token || '';
  const data: Archive[] = await fetchArchives(to);
  return {
    props: {
      data,
      to,
    },
  };
};

export default Home;
