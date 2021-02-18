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
      query: { response: 'You have signed out successfully.' },
    });
  };

  const handleBacktoHome = (e) => {
    e.preventDefault();
    Router.push('/');
  };

  return (
    <Layout>
      <HeaderLogin />
      <div className="content">
        <div className="confirm">
          <div className="message">Do you want to Sign out?</div>

          <button type="submit" onClick={handleSignout} className="btn">
            Yes
          </button>
          <button type="submit" onClick={handleBacktoHome} className="btn">
            No
          </button>
        </div>
      </div>
    </Layout>
  );
}
