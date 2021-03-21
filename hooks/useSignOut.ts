import Router from 'next/router';
import React, { useCallback } from 'react';

export const useSignOut = () => {
  const signOut = useCallback(async (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsLoading(true);
    const response = await fetch('/api/signout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (response.status === 200) {
      Router.push('/');
    }
  }, []);
  return { signOut };
};
