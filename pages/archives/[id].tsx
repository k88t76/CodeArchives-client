import React, { memo, useState } from 'react';
import { SignInLayout } from '../../components/templates/SignInLayout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { CodeCreation } from '../../components/templates/CodeCreation';
import Router from 'next/router';
import { Archive } from '../../types/archive';
import { editArchive } from '../../lib/archive/editArchive';

const url = process.env.NEXT_PUBLIC_URL;

interface Props {
  data: Archive;
  id: string;
}

const Content: NextPage<Props> = memo(({ data, id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <SignInLayout>
      <div className="pt-24 px-5">
        {!data && (
          <>
            <div>This Archive has already been deleted.</div>
            <div className="text-blue-600 hover:cursor-pointer">
              <p
                onClick={() => {
                  setIsLoading(true);
                  Router.push('/');
                }}
              >
                ← Back to home
              </p>
            </div>
          </>
        )}
        {data && <CodeCreation id={id} data={data} submitFunction={editArchive} isCreate={false} />}
      </div>
    </SignInLayout>
  );
});

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id: string | string[] = params.id;
  const res: Response = await fetch(`${url}/archive/${id}`);
  const data: Archive = await res.json();
  return {
    props: { data, id },
  };
};

export default Content;
