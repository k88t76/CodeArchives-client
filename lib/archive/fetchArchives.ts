import { Archive } from '../../types/archive';

const url = process.env.NEXT_PUBLIC_URL;

export async function fetchArchives(token: string, search?: string): Promise<Archive[] | null> {
  var path = `${url}/archives`;
  if (search) {
    path = `${url}/search/${search}`;
  }
  const response = await fetch(path, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
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

  const json = await response
    .json()
    .then((json: Archive[]) => {
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
