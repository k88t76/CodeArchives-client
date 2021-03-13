import Link from 'next/link';
import React, { useEffect } from 'react';

const url = process.env.NEXT_PUBLIC_URL;

interface Props {
  path: string;
  handleSubmit: (e: any) => Promise<void>;
  handleChange: (e: any) => void;
}

export const Form: React.FC<Props> = ({ path, handleSubmit, handleChange }) => {
  const handleTitle = (path: string) => {
    if (path === 'signin') {
      return 'PLEASE SIGN IN';
    } else if (path === 'signup') {
      return 'SIGN UP';
    } else {
      return 'GUEST SIGN IN';
    }
  };

  const handleButton = (path: string) => {
    if (path === 'signup') {
      return 'Sign Up';
    } else {
      return 'Sign In';
    }
  };

  const handleAlt = (path: string) => {
    if (path === 'signin') {
      return 'Sign in as a Guest?';
    } else {
      return 'Sign in as your account?';
    }
  };

  const handleValue = (path: string) => {
    if (path === 'guestsignin') {
      var name = document.getElementById('name') as HTMLTextAreaElement;
      var password = document.getElementById('password') as HTMLTextAreaElement;
      name.value = 'guest-user';
      password.value = 'guest';
    }
  };

  useEffect(() => {
    handleValue(path);
  }, []);

  return (
    <div className="mt-32 md:mx-auto w-full md:w-3/4 lg:w-160 bg-white shadow-md border border-gray-300 px-16 pt-6 pb-8 mb-4 flex flex-col">
      <div className="font-bold self-center py-3 text-xl sm:text-2xl uppercase text-gray-800">{handleTitle(path)}</div>
      <form action={`${url}/${path}`} method="post" onSubmit={handleSubmit} className="my-4">
        <label className="block font-bold mb-1">Username</label>
        <input
          id="name"
          type="text"
          placeholder="Username"
          name="name"
          onChange={handleChange}
          readOnly={path === 'guestsignin' ? true : false}
          required
          className="shadow appearance-none border rounded-lg w-full py-2 px-3"
        />
        <div className="mb-6">
          <label className="block font-bold mt-6 mb-1">Password</label>
          <input
            id="password"
            type={path === 'guestsignin' ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            readOnly={path === 'guestsignin' ? true : false}
            onChange={handleChange}
            required
            className="shadow appearance-none border border-red rounded-lg w-full py-2 px-3 mb-3"
          />
        </div>
        <div className="flex items-center justify-between">
          <Link href={path === 'signin' ? '/guest-signin' : '/'}>
            <a className="inline-block font-bold text-sm text-gray-500 ml-0.5 hover:text-blue-500">{handleAlt(path)}</a>
          </Link>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 w-40 shadow-md text-white font-bold py-2 px-4 rounded-lg"
          >
            {handleButton(path)}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
