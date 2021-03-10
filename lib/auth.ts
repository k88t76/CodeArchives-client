interface User {
  name: string;
  password: string;
}

const url = 'https://codearchives-server.dt.r.appspot.com';
//const url = 'http://localhost:8080';
export async function fetchAuth(user: User, path: string): Promise<string | null> {
  const response = await fetch(`${url}/${path}`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
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

export async function fetchCookie(): Promise<string | null> {
  const response = await fetch(`${url}/cookie`, {
    method: 'GET',
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
