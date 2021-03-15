import Layout from '../components/layout';
import { NextPage } from 'next';
import Router from 'next/router';
import React, { useState } from 'react';
import HeaderUnLogin from '../components/headerUnLogin';
import { User, fetchAuth, setCookie } from '../lib/auth';
import Form from '../components/form';
import Loading from '../components/loading';

const GuestSignin: NextPage = () => {
  const [user, setUser] = useState<User>({
    name: 'guest-user',
    password: 'guest',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleTestSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetchAuth(user, 'guest-signin');
    await setCookie(res);
    Router.push('/');
  };

  return (
    <Layout>
      <HeaderUnLogin />
      <Loading isLoading={isLoading} />
      <div className="content">
        <Form path="guest-signin" handleSubmit={handleTestSignIn} handleChange={handleChange} />
      </div>
    </Layout>
  );
};

export default GuestSignin;
