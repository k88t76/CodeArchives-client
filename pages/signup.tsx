import Layout from '../components/layout';
import HeaderUnLogin from '../components/headerUnLogin';
import Form from '../components/form';
import Router from 'next/router';
import React, { useState } from 'react';
import Cookie from 'js-cookie';
import { fetchAuth } from '../lib/auth';
import HeaderLogin from '../components/headerLogin';

export default function Signup() {
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
      Cookie.set('token', res, { expires: 1 });
      Router.push('/');
    }
  };
  return (
    <Layout>
      <HeaderUnLogin />
      <div className="content">
        {response.message}
        <Form path="signup" handleSubmit={handleSignup} handleChange={handleChange} />
      </div>
    </Layout>
  );
}
