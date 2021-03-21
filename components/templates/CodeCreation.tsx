import React, { useState, useEffect, memo } from 'react';
import Router from 'next/router';
import Prism from '../../public/js/prism.js';
import { SetImageDetail } from '../atoms/SetImageDetail';
import { Loading } from '../atoms/Loading';

import { LanguageSelect } from '../molecules/LanguageSelect';

import { TitleInput } from '../molecules/TitleInput';
import { SaveButton } from '../atoms/SaveButton';
import { Archive } from '../../types/archive';
import { deleteArchive } from '../../lib/archive/deleteArchive';
import { CodeArea } from '../organisms/codeArea';
import { DeleteButton } from '../atoms/deleteButton';

interface Props {
  id?: string;
  data: Archive;
  submitFunction: any;
  isCreate: boolean;
}

export const CodeCreation: React.VFC<Props> = memo(({ id, data, submitFunction, isCreate }) => {
  const [archive, setArchive] = useState<Archive>({
    uuid: data && data.uuid,
    content: data && data.content,
    title: data && data.title,
    author: data && data.author,
    language: data && data.language,
    created_at: data && data.created_at,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setArchive({ ...archive, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await submitFunction(archive, id);
    if (res === 201) {
      Router.push('/');
    }
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await deleteArchive(id);
    if (res == 204) {
      Router.push({
        pathname: '/',
      });
    }
  };

  const handleAlert = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [archive]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div>
        <div className="toolbar flex z-50 -ml-5 pl-3 py-3 fixed bg-white w-screen">
          <div className="mt-2 pl-4 mr-4 w-16 flex-shrink-0">
            <SetImageDetail language={archive.language} />
          </div>
          <TitleInput title={archive.title} onChange={handleChange} />

          <LanguageSelect language={archive.language} archive={archive} setArchive={setArchive} />

          <form method="post" onSubmit={isCreate ? handleAlert : handleDelete}>
            <DeleteButton isCreate={isCreate} />
          </form>
          <div className="flex-grow"></div>

          <SaveButton />
        </div>

        <CodeArea archive={archive} setArchive={setArchive} onSubmit={handleSubmit} onChange={handleChange} />
      </div>
    </>
  );
});
