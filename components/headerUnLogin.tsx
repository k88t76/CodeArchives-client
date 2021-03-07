import Link from 'next/link';
import React from 'react';
import HeaderLogin from './headerLogin';

const HeaderUnLogin: React.FC = () => {
  return (
    <div className="header">
      <Link href="/">
        <a className="logo">Code Archives</a>
      </Link>
      <Link href="/signup">
        <a href="#" className="btn">
          Sign up
        </a>
      </Link>
    </div>
  );
};

export default HeaderUnLogin;
