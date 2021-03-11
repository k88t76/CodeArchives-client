import React from 'react';
import Layout from '../../components/layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Router from 'next/router';
import HeaderLogin from '../../components/headerLogin';
import Detail from '../../components/detali';
import Prism from '../../public/js/prism.js';
import { Archive, editArchive } from '../../lib/archive';

const url = 'https://codearchives-server.dt.r.appspot.com';
//const url = 'http://localhost:8080';

interface Props {
  data: Archive;
  id: string;
}

const Content: NextPage<Props> = ({ data, id }) => {
  const handleBacktoHome = (e) => {
    e.preventDefault();
    setTimeout(Prism.highlightAll, 0);
    Router.push('/');
  };

  return (
    <Layout>
      <HeaderLogin />
      <div className="pt-24 px-5">
        {!data && (
          <>
            <div>This Archive has already been deleted.</div>
            <div className="text-blue-600 hover:cursor-pointer">
              <p onClick={handleBacktoHome}>← Back to home</p>
            </div>
          </>
        )}
        {data && <Detail id={id} data={data} submitFunction={editArchive} isCreate={false} />}
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id;
  const res = await fetch(`${url}/archive/${id}`);
  const data = await res.json();
  return {
    props: { data, id },
  };
};

export default Content;
