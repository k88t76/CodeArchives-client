import { User } from '../../types/user';

const url = process.env.NEXT_PUBLIC_URL;

export async function fetchToken(user: User, path: string): Promise<string | null> {
  const response = await fetch(`${url}/${path}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res: Response) => res)
    .catch((error) => {
      console.error(error);
      return null;
    });

  if (!response) {
    return null;
  }

  const json = await response
    .json()
    .then((json: string) => {
      return json;
    })
    .catch((error: React.ErrorInfo) => {
      console.error(error);
      return null;
    });

  if (!json) {
    return null;
  }

  return json;
}
