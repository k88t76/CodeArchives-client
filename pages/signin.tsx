import Layout from '../components/layout';
import HeaderUnLogin from '../components/headerUnLogin';
import Form from '../components/form';
import Router from 'next/router';
import React, { useState } from 'react';
import Cookie from 'js-cookie';
import { fetchAuth } from '../lib/auth';

const url = 'https://codearchives-server.dt.r.appspot.com';

export default function SignIn() {
  const [response, setResponse] = useState({
    type: '',
    message: '',
  });

  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSignIn = async (e) => {
    e.preventDefault();
    const token = await fetchAuth(user, 'signin');
    console.log(token);
    if (token === 'Wrong Password') {
      setResponse({
        type: 'error',
        message: 'The password is incorrect',
      });
    } else {
      Cookie.set('token', token, { expires: 1 });
      Router.push({
        pathname: '/',
        query: { name: user.name },
      });
    }
  };

  return (
    <Layout>
      <HeaderUnLogin />
      <div className="content">
        {response.message}
        <Form path={'signin'} handleSubmit={handleSignIn} handleChange={handleChange} />
      </div>
    </Layout>
  );
}
