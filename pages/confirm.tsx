import Layout from '../components/layout';
import React from 'react';
import Router from 'next/router';
import Cookie from 'js-cookie';
import HeaderLogin from '../components/headerLogin';

export default function Confirm() {
  const handleSignout = (e) => {
    e.preventDefault();
    Cookie.remove('token');
    Router.push({
      pathname: '/',
      query: { type: 'success', response: 'You have signed out successfully.' },
    });
  };

  const handleBacktoHome = (e) => {
    e.preventDefault();
    Router.push('/');
  };

  return (
    <Layout>
      <HeaderLogin />
      <div className="content flex flex-col">
        <div className="self-center text-xl font-bold mt-20">Are you sure you want to sign out?</div>

        <div className="flex mx-auto mt-4">
          <button type="submit" onClick={handleSignout} className="btn w-20 m-4">
            Yes
          </button>
          <button type="submit" onClick={handleBacktoHome} className="btn w-20 m-4">
            No
          </button>
        </div>
      </div>
    </Layout>
  );
}
