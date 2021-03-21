import React, { memo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { SignInLayout } from '../components/templates/SignInLayout';
import { CodeCreation } from '../components/templates/CodeCreation';
import { Archive } from '../types/archive';
import { createArchive } from '../lib/archive/createArchive';
import { fetchNameByToken } from '../lib/user/fetchNameByToken';

const url = process.env.NEXT_PUBLIC_URL;

interface Props {
  name: string;
}

const New: NextPage<Props> = memo(({ name }) => {
  const [archive, setArchive] = useState<Archive>({
    uuid: '',
    content: '',
    title: '',
    author: name,
    language: '',
    created_at: '',
  });

  return (
    <SignInLayout>
      <div className="pt-24 px-5">
        <CodeCreation data={archive} submitFunction={createArchive} isCreate={true} />
      </div>
    </SignInLayout>
  );
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token: string = req.cookies.cookie || '';
  const name: string = await fetchNameByToken(token);
  return {
    props: {
      name,
    },
  };
};

export default New;
