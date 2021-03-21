import { NextPage } from 'next';
import { UnSignInLayout } from '../components/templates/UnSignInLayout';
import { Form } from '../components/organisms/Form';
import React, { memo, useState } from 'react';
import { Loading } from '../components/atoms/Loading';
import { useSignUp } from '../hooks/useSignUp';
import { User } from '../types/user';
import { ResponseState } from '../types/response';

const SignUp: NextPage = memo(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: '',
    password: '',
  });
  const [response, setResponse] = useState<ResponseState>({
    type: '',
    message: '',
  });

  const { signUp } = useSignUp();

  return (
    <UnSignInLayout>
      <Loading isLoading={isLoading} />
      <div className="content">
        <p className={`${response.type}`}>{response.message}</p>
        <Form
          path="signup"
          handleSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            signUp(user, setIsLoading, setResponse, e);
          }}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
      </div>
    </UnSignInLayout>
  );
});

export default SignUp;
