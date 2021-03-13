import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('cookie', req.body.token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};
