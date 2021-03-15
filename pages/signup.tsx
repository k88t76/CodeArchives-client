import { NextPage } from 'next';
import Layout from '../components/layout';
import HeaderUnLogin from '../components/headerUnLogin';
import Form from '../components/form';
import Router from 'next/router';
import React, { useState } from 'react';
import { User, fetchAuth, setCookie } from '../lib/auth';
import Loading from '../components/loading';

interface ResponseState {
  type: string | string[];
  message: string | string[];
}

const Signup: NextPage = () => {
  const [user, setUser] = useState<User>({
    name: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [response, setResponse] = useState<ResponseState>({
    type: '',
    message: '',
  });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetchAuth(user, 'signup');
    if (res === 'UsedName') {
      setResponse({
        type: 'error',
        message: 'The username is already used',
      });
    } else {
      setIsLoading(true);
      await setCookie(res);
      Router.push('/');
    }
  };
  return (
    <Layout>
      <HeaderUnLogin />
      <Loading isLoading={isLoading} />
      <div className="content">
        <p className={`${response.type}`}>{response.message}</p>
        <Form path="signup" handleSubmit={handleSignup} handleChange={handleChange} />
      </div>
    </Layout>
  );
};

export default Signup;
