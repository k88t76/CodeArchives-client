const url = process.env.NEXT_PUBLIC_URL;

export async function fetchNameByToken(token: string): Promise<string | null> {
  const response = await fetch(`${url}/userbytoken`, {
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
