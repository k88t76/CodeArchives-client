export async function removeCookie(): Promise<Response> {
  const response = fetch('/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  return response;
}
