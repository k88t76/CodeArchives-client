import Router from 'next/router';
import { useCallback } from 'react';
import { fetchToken } from '../lib/auth/fetchToken';
import { setCookie } from '../lib/auth/setCookie';
import { User } from '../types/user';

interface ResponseState {
  type: string;
  message: string;
}

export const useSignUp = () => {
  const signUp = useCallback(
    async (
      user: User,
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
      setResponse: React.Dispatch<React.SetStateAction<ResponseState>>,
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
      const res = await fetchToken(user, 'signup');
      if (res === 'UsedName') {
        setResponse({
          type: 'error',
          message: 'The username is already used',
        });
        setTimeout(() => {
          setResponse({
            type: '',
            message: '',
          });
        }, 3000);
      } else {
        setIsLoading(true);
        await setCookie(res);
        Router.push('/');
      }
    },
    []
  );
  return { signUp };
};
