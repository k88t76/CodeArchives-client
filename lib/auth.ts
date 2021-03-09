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

export async function fetchCookie(path: string): Promise<any | null> {
  if (path === 'set') {
    const response = await fetch(`${url}/setcookie`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify('token'),
    });
    return null;
  } else {
    const response = await fetch(`${url}/getcookie`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify('token'),
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
}
