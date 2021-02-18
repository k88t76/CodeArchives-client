import Layout from '../components/layout';
import Router from 'next/router';
import React, { useState } from 'react';
import HeaderUnLogin from '../components/headerUnLogin';
import { fetchAuth } from '../lib/auth';
import Cookie from 'js-cookie';

const url = 'https://codearchives-server.dt.r.appspot.com';

export default function TestSignIn() {
  const [response, setResponse] = useState({
    type: '',
    message: '',
  });

  const [user, setUser] = useState({
    name: 'test-user',
    password: 'test',
  });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleTestSignIn = async (e) => {
    e.preventDefault();
    const res = await fetchAuth(user, 'testsignin');
    if (res === 'Wrong Password') {
      setResponse({
        type: 'error',
        message: 'The password is incorrect',
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
        <form action={`${url}/testsignin`} method="post" onSubmit={handleTestSignIn}>
          <label>UserName</label>
          <div>
            <input type="text" value="test-user" name="name" readOnly={true} onChange={handleChange} required />
          </div>

          <label>Password</label>
          <div>
            <input type="password" value="test" name="password" readOnly={true} onChange={handleChange} required />
          </div>
          <button type="submit">Test Sign in</button>
        </form>
      </div>
    </Layout>
  );
}
