import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { createArchive } from '../lib/archive';
import { Archive } from '../lib/archive';
import HeaderLogin from '../components/headerLogin';
import Layout from '../components/layout';
import Field from '../components/field';

const url = process.env.NEXT_PUBLIC_URL;

interface Props {
  name: string;
}

const New: NextPage<Props> = ({ name }) => {
  const [archive, setArchive] = useState<Archive>({
    uuid: '',
    content: '',
    title: '',
    author: name,
    language: '',
    created_at: '',
  });

  return (
    <Layout>
      <HeaderLogin />
      <div className="pt-24 px-5">
        <Field data={archive} submitFunction={createArchive} isCreate={true} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token: string = req.cookies.cookie || '';
  const data: Response = await fetch(`${url}/userbytoken`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(token),
  });
  const name: string = await data.json();
  return {
    props: {
      name,
    },
  };
};

export default New;
