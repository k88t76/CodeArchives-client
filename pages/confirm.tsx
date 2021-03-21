import { SignInLayout } from '../components/templates/SignInLayout';
import React, { memo, useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Loading } from '../components/atoms/Loading';
import { useSignOut } from '../hooks/useSignOut';

const Confirm: NextPage = memo(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signOut } = useSignOut();

  return (
    <SignInLayout>
      <Loading isLoading={isLoading} />
      <div className="content flex flex-col">
        <div className="self-center text-xl font-bold mt-20">Are you sure you want to sign out?</div>

        <div className="flex mx-auto mt-4">
          <button type="submit" onClick={() => signOut(setIsLoading)} className="btn w-20 m-4">
            Yes
          </button>
          <button
            type="submit"
            onClick={() => {
              setIsLoading(true);
              Router.push('/');
            }}
            className="btn w-20 m-4"
          >
            No
          </button>
        </div>
      </div>
    </SignInLayout>
  );
});

export default Confirm;
