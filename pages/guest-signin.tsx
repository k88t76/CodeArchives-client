import { UnSignInLayout } from '../components/templates/UnSignInLayout';
import { NextPage } from 'next';
import React, { memo, useState } from 'react';
import { Form } from '../components/organisms/Form';
import { Loading } from '../components/atoms/Loading';
import { useGuestSignIn } from '../hooks/useGuestSignIn';
import { User } from '../types/user';

const GuestSignIn: NextPage = memo(() => {
  const [user, setUser] = useState<User>({
    name: 'guest-user',
    password: 'guest',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { guestSignIn } = useGuestSignIn();

  return (
    <UnSignInLayout>
      <Loading isLoading={isLoading} />
      <div className="content">
        <Form
          path="guest-signin"
          handleSubmit={(e: React.FormEvent<HTMLFormElement>) => guestSignIn(user, setIsLoading, e)}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
      </div>
    </UnSignInLayout>
  );
});

export default GuestSignIn;
