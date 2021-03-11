import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { createArchive } from '../lib/archive';
import { Archive } from '../lib/archive';
import HeaderLogin from '../components/headerLogin';
import Layout from '../components/layout';
import Detail from '../components/detali';

const url = 'https://codearchives-server.dt.r.appspot.com';
//const url = 'http://localhost:8080';

interface Props {
  name: string;
}

const New: NextPage<any> = ({ name }) => {
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
        <Detail data={archive} submitFunction={createArchive} isCreate={true} />
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
