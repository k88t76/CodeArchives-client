export async function setCookie(token: string): Promise<Response> {
  const response = fetch('/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: token }),
  });
  return response;
}
