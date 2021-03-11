import Link from 'next/link';
import React from 'react';

const HeaderUnLogin: React.FC = () => {
  return (
    <div className="header">
      <div className="flex items-center text-white">
        <span className="font-extrabold ml-3 sm:text-2xl tracking-tight hover:cursor-pointer">Code Archives</span>
      </div>
      <div className="flex-grow"></div>
      <Link href="/signup">
        <a href="#" className="text-xl text-center py-1 w-28 bg-blue-600  rounded text-white hover:bg-blue-700 border">
          Sign Up
        </a>
      </Link>
    </div>
  );
};

export default HeaderUnLogin;
