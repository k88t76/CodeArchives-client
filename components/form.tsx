import Link from 'next/link';
import React from 'react';

const url = 'https://codearchives-server.dt.r.appspot.com';

interface Props {
  path: string;
  handleSubmit: (e: any) => Promise<void>;
  handleChange: (e: any) => void;
}

export const Form: React.FC<Props> = ({ path, handleSubmit, handleChange }) => {
  const handleButton = (path: string) => {
    if (path === 'signin') {
      return 'Sign in';
    } else if (path === 'signup') {
      return 'Sign up';
    }
  };

  const handleAlt = (path: string) => {
    if (path === 'signin') {
      return 'Sign in as a Guest?';
    } else if (path === 'signup') {
      return 'Back to Home';
    }
  };

  return (
    <div className="mt-32 md:mx-auto w-full md:w-3/4 lg:w-160 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div className="font-bold self-center text-xl sm:text-2xl uppercase text-gray-800">
        {path === 'signup' ? 'Sign up' : 'Please Sign in'}
      </div>
      <form action={`${url}/${path}`} method="post" onSubmit={handleSubmit} className="my-4">
        <label className="block text-sm font-bold mb-2">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="name"
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 mb-3"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 shadow-md text-white font-bold py-2 px-4 rounded"
          >
            {handleButton(path)}
          </button>
          <Link href={path === 'signin' ? '/guest-signin' : '/'}>
            <a className="inline-block font-bold text-sm text-gray-500 hover:text-blue-500">{handleAlt(path)}</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
