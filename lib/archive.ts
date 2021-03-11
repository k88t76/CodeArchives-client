const url = 'https://codearchives-server.dt.r.appspot.com';
//const url = 'http://localhost:8080';

export interface Archive {
  uuid: string;
  content: string;
  title: string;
  author: string;
  language: string;
  created_at: string;
}

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

export async function createArchive(
  archive: {
    content: string;
    title: string;
    author: string;
    language: string;
  },
  id?: string
): Promise<number | null> {
  const response = await fetch(`${url}/create`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(archive),
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

export async function editArchive(
  archive: {
    content: string;
    title: string;
    author: string;
    language: string;
  },
  id: string
): Promise<number | null> {
  const response = await fetch(`${url}/edit/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(archive),
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

export async function deleteArchive(id: string): Promise<number | null> {
  const response = await fetch(`${url}/delete/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
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
