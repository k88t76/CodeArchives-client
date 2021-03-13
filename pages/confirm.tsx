import Layout from '../components/layout';
import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import HeaderLogin from '../components/headerLogin';

const Confirm: NextPage = () => {
  const handleSignout = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/signout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (response.status === 200) {
      Router.push({
        pathname: '/',
      });
    }
  };

  const handleBacktoHome = () => {
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
};

export default Confirm;
