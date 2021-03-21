import React, { useState, useEffect, memo, ChangeEventHandler, ChangeEvent } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import HeaderUnLogin from '../components/headerUnLogin';
import HeaderLogin from '../components/headerLogin';
import Layout from '../components/layout';
import Prism from '../public/js/prism.js';
import Search from '../components/search';
import Contents from '../components/organisms/contents';
import Sidebar from '../components/sidebar';
import Loading from '../components/loading';
import { Archive, fetchArchives } from '../lib/archive';
import Form from '../components/form';
import { User, fetchAuth, setCookie } from '../lib/auth';
import { useMessage } from '../hooks/useMessage';

interface Props {
  data: Archive[];
  to: string;
}

const Home: NextPage<Props> = memo(({ data, to }) => {
  const [archives, setArchives] = useState<Archive[]>(data);
  const [token, setToken] = useState<string>(to);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { showMessage } = useMessage();

  const [user, setUser] = useState<User>({
    name: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await fetchAuth(user, 'signin');
    if (token === 'Unknown User') {
      showMessage({ title: 'ユーザーが見つかりません', status: 'error' });
    } else if (token === 'Wrong Password') {
      showMessage({ title: 'パスワードが違います', status: 'error' });
    } else {
      setIsLoading(true);
      setCookie(token);
      setToken(token);
      showMessage({ title: 'ログインに成功しました', status: 'success' });
      setArchives(await fetchArchives(token));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [archives]);

  if (token === '') {
    return (
      <>
        <HeaderUnLogin />
        <div className="content">
          <Loading isLoading={isLoading} />
          <Form path={'signin'} handleSubmit={handleSignIn} handleChange={handleChange} />
        </div>
      </>
    );
  } else {
    return (
      <Layout>
        <HeaderLogin />
        <div className="flex">
          {archives && <Sidebar archives={archives} />}
          <div className="content">
            <div className="flex-grow"></div>
            <span className="flex mr-12"></span>
            <Search setArchives={setArchives} token={token} />
            <div className="pt-24">{archives && <Contents archives={archives} />}</div>
            {!archives && <div className="-mt-16 ml-5 text-xl">Empty</div>}
          </div>
        </div>
      </Layout>
    );
  }
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const to = req.cookies.cookie || '';
  const data: Archive[] = await fetchArchives(to);
  return {
    props: {
      data,
      to,
    },
  };
};

export default Home;
