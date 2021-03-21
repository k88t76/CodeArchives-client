import Router from 'next/router';
import { useCallback } from 'react';
import { fetchToken } from '../lib/auth/fetchToken';
import { setCookie } from '../lib/auth/setCookie';
import { User } from '../types/user';

export const useGuestSignIn = () => {
  const guestSignIn = useCallback(
    async (
      user: User,
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
      setIsLoading(true);
      const res = await fetchToken(user, 'guest-signin');
      await setCookie(res);

      Router.push('/');
    },
    []
  );
  return { guestSignIn };
};
