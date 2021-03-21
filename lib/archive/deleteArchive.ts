const url = process.env.NEXT_PUBLIC_URL;

export async function deleteArchive(id: string): Promise<number | null> {
  const response = await fetch(`${url}/archive/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  })
    .then((res: Response) => res)
    .catch((error: React.ErrorInfo) => {
      console.error(error);
      return null;
    });

  if (!response) {
    return null;
  }
  return response.status;
}
