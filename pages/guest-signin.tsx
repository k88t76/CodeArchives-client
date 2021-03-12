import Layout from '../components/layout';
import { NextPage } from 'next';
import Router from 'next/router';
import React, { useState } from 'react';
import HeaderUnLogin from '../components/headerUnLogin';
import { fetchAuth } from '../lib/auth';
import Cookie from 'js-cookie';
import Form from '../components/form';

const url = process.env.NEXT_PUBLIC_URL;

const GuestSignin: NextPage = () => {
  const [user, setUser] = useState({
    name: 'guest-user',
    password: 'guest',
  });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleTestSignIn = async (e) => {
    e.preventDefault();
    const res = await fetchAuth(user, 'guestsignin');
    Cookie.set('cookie', res, { expires: 1 });
    Router.push('/');
  };

  return (
    <Layout>
      <HeaderUnLogin />
      <div className="content">
        <Form path="guest-signin" handleSubmit={handleTestSignIn} handleChange={handleChange} />
      </div>
    </Layout>
  );
};

export default GuestSignin;
