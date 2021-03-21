import Link from 'next/link';
import React, { memo, useEffect } from 'react';

const url = process.env.NEXT_PUBLIC_URL;

interface Props {
  path: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Form: React.VFC<Props> = memo(({ path, handleSubmit, handleChange }) => {
  const handleTitle = (path: string) => {
    if (path === 'signin') {
      return 'PLEASE SIGN IN';
    } else if (path === 'signup') {
      return 'SIGN UP';
    } else {
      return 'GUEST SIGN IN';
    }
  };

  const handleValue = (path: string) => {
    if (path === 'guest-signin') {
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
          readOnly={path === 'guest-signin' ? true : false}
          required
          className="shadow appearance-none border rounded-lg w-full py-2 px-3"
        />
        <div className="mb-6">
          <label className="block font-bold mt-6 mb-1">Password</label>
          <input
            id="password"
            type={path === 'guest-signin' ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            readOnly={path === 'guest-signin' ? true : false}
            onChange={handleChange}
            required
            className="shadow appearance-none border border-red rounded-lg w-full py-2 px-3 mb-3"
          />
        </div>
        <div className="flex items-center justify-between">
          <Link href={path === 'signin' ? '/guest-signin' : '/'}>
            <a className="inline-block font-bold text-sm text-gray-500 ml-0.5 hover:text-blue-500">
              {path === 'signin' ? 'Sign in as a Guest?' : 'Sign in as your account?'}
            </a>
          </Link>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 w-40 shadow-md text-white font-bold py-2 px-4 rounded-lg"
          >
            {path === 'signup' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
});
