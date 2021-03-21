import { useCallback } from 'react';
import { fetchArchives } from '../lib/archive/fetchArchives';
import { fetchToken } from '../lib/auth/fetchToken';
import { setCookie } from '../lib/auth/setCookie';
import { Archive } from '../types/archive';
import { ResponseState } from '../types/response';
import { User } from '../types/user';

export const useSignIn = () => {
  const signIn = useCallback(
    async (
      user: User,
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
      setToken: React.Dispatch<React.SetStateAction<string>>,
      setArchives: React.Dispatch<React.SetStateAction<Archive[]>>,
      setResponse: React.Dispatch<React.SetStateAction<ResponseState>>,
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
      const token = await fetchToken(user, 'signin');
      if (token === 'Unknown User') {
        setResponse({
          type: 'error',
          message: 'The user is not registered',
        });
        setTimeout(() => {
          setResponse({
            type: '',
            message: '',
          });
        }, 3000);
      } else if (token === 'Wrong Password') {
        setResponse({
          type: 'error',
          message: 'The password is incorrect',
        });
        setTimeout(() => {
          setResponse({
            type: '',
            message: '',
          });
        }, 3000);
      } else {
        setIsLoading(true);
        setCookie(token);
        setToken(token);
        setArchives(await fetchArchives(token));
        setIsLoading(false);
      }
    },
    []
  );
  return { signIn };
};
