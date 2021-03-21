const url = process.env.NEXT_PUBLIC_URL;

export async function editArchive(
  archive: {
    content: string;
    title: string;
    author: string;
    language: string;
  },
  id: string
): Promise<number | null> {
  const response = await fetch(`${url}/archive/${id}`, {
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
