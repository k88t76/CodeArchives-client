import { useCallback } from 'react';
import { useMessage } from './useMessage';

export const useAuth = () => {
  const { showMessage } = useMessage();

  const login = useCallback((token: string) => {
    if (token === 'Unknown User') {
      showMessage({ title: 'ユーザーが見つかりません', status: 'error' });
      return null;
    } else if (token === 'Wrong Password') {
      showMessage({ title: 'パスワードが間違っています', status: 'error' });
      return null;
    }
    return token;
  }, []);
  return { login };
};
