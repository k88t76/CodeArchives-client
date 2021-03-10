import { NextPage } from 'next';
import Layout from '../components/layout';
import HeaderUnLogin from '../components/headerUnLogin';
import Form from '../components/form';
import Router from 'next/router';
import React, { useState } from 'react';
import { fetchAuth } from '../lib/auth';

const Signup: NextPage = () => {
  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const [response, setResponse] = useState({
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
      //Cookie.set('token', res, { expires: 1 });
      Router.push('/');
    }
  };
  return (
    <Layout>
      <HeaderUnLogin />
      <div className="content">
        <p className={`${response.type}`}>{response.message}</p>
        <Form path="signup" handleSubmit={handleSignup} handleChange={handleChange} />
      </div>
    </Layout>
  );
};

export default Signup;
