interface User {
  name: string;
  password: string;
}

const url = process.env.NEXT_PUBLIC_URL;

export async function fetchAuth(user: User, path: string): Promise<string | null> {
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
    .catch((error) => {
      console.error(error);
      return null;
    });

  if (!json) {
    return null;
  }

  return json;
}

export async function setCookie(token: string): Promise<number | null> {
  const response = await fetch(`${url}/setcookie`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(token),
  })
    .then((res: Response) => res)
    .catch((error) => {
      console.error(error);
      return null;
    });

  if (!response) {
    return null;
  }
  return response.status;
}

export async function deleteCookie(): Promise<number | null> {
  const response = await fetch(`${url}/deletecookie`, {
    method: 'DELETE',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then((res: Response) => res)
    .catch((error) => {
      console.error(error);
      return null;
    });

  if (!response) {
    return null;
  }
  return response.status;
}
