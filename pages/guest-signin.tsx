import Layout from '../components/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import HeaderUnLogin from '../components/headerUnLogin';
import { fetchAuth } from '../lib/auth';
import Cookie from 'js-cookie';

//const url = 'https://codearchives-server.dt.r.appspot.com';
const url = 'http://localhost:8080';

const GuestSignin: NextPage = () => {
  const [user, setUser] = useState({
    name: 'guest-user',
    password: 'guest',
  });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleTestSignIn = async (e) => {
    e.preventDefault();
    const res = await fetchAuth(user, 'guestsignin');
    Cookie.set('token', res, { expires: 1 });
    Router.push('/');
  };

  return (
    <Layout>
      <HeaderUnLogin />
      <div className="content">
        <div className="mt-32 md:mx-auto w-full md:w-3/4 lg:w-160 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="font-bold self-center text-xl sm:text-2xl uppercase text-gray-800">Guest Sign in</div>
          <form action={`${url}/guestsignin`} method="post" onSubmit={handleTestSignIn} className="my-4">
            <label className="block text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              value="guest-user"
              name="name"
              onChange={handleChange}
              readOnly={true}
              className="shadow appearance-none border rounded w-full py-2 px-3"
            />
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Password</label>
              <input
                type="text"
                name="password"
                value="guest"
                onChange={handleChange}
                readOnly={true}
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 mb-3"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 shadow-md text-white font-bold py-2 px-4 rounded"
              >
                Sign in
              </button>
              <Link href="/">
                <a className="inline-block font-bold text-sm text-gray-500 hover:text-blue-500">
                  Sign in as your account?
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default GuestSignin;
