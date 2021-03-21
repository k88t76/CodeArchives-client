import React, { useState, useEffect, memo } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { SignInLayout } from '../components/templates/SignInLayout';
import { UnSignInLayout } from '../components/templates/UnSignInLayout';
import Prism from '../public/js/prism.js';
import { Search } from '../components/molecules/Search';
import { Contents } from '../components/organisms/Contents';
import { Sidebar } from '../components/organisms/Sidebar';
import { Loading } from '../components/atoms/Loading';
import { Form } from '../components/organisms/Form';
import { useSignIn } from '../hooks/useSignIn';
import { Archive } from '../types/archive';
import { User } from '../types/user';
import { ResponseState } from '../types/response';
import { fetchArchives } from '../lib/archive/fetchArchives';

interface Props {
  data: Archive[];
  to: string;
}

const Home: NextPage<Props> = memo(({ data, to }) => {
  const [archives, setArchives] = useState<Archive[]>(data);
  const [token, setToken] = useState<string>(to);
  const [response, setResponse] = useState<ResponseState>({
    type: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: '',
    password: '',
  });
  const { signIn } = useSignIn();

  useEffect(() => {
    Prism.highlightAll();
  }, [archives]);

  if (token === '') {
    return (
      <UnSignInLayout>
        <div className="content">
          <Loading isLoading={isLoading} />
          <p className={`${response.type}`}>{response.message}</p>
          <Form
            path="signin"
            handleSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
              signIn(user, setIsLoading, setToken, setArchives, setResponse, e);
            }}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
        </div>
      </UnSignInLayout>
    );
  } else {
    return (
      <SignInLayout>
        <p className={`${response.type}`}>{response.message}</p>
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
      </SignInLayout>
    );
  }
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const to: string = req.cookies.cookie || '';
  const data: Archive[] = await fetchArchives(to);
  return {
    props: {
      data,
      to,
    },
  };
};

export default Home;
