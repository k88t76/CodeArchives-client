import { NextApiResponse } from 'next';
import cookie from 'cookie';

export default (res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('cookie', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};
