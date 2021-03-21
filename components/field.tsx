import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import Prism from '../public/js/prism.js';
import { Archive, deleteArchive } from '../lib/archive';
import setImageDetail from '../lib/setImageDetail';
import Loading from '../components/loading';
import { CodeArea } from './organisms/codeArea';
import { LanguageSelect } from './molecules/LanguageSelect';
import { DeleteButton } from './atoms/deleteButton';
import { TitleInput } from './molecules/TitleInput';

interface Props {
  id?: string;
  data: Archive;
  submitFunction: any;
  isCreate: boolean;
}

const Field: React.FC<Props> = ({ id, data, submitFunction, isCreate }) => {
  const [archive, setArchive] = useState<Archive>({
    uuid: data && data.uuid,
    content: data && data.content,
    title: data && data.title,
    author: data && data.author,
    language: data && data.language,
    created_at: data && data.created_at,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setArchive({ ...archive, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await submitFunction(archive, id);
    if (res === 201) {
      Router.push('/');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await deleteArchive(id);
    if (res == 204) {
      Router.push({
        pathname: '/',
      });
    }
  };

  const handleAlert = async (e) => {
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
          <div className="mt-2 pl-4 mr-4 w-16 flex-shrink-0">{setImageDetail(archive.language)}</div>
          <TitleInput title={archive.title} onChange={handleChange} />

          <LanguageSelect language={archive.language} archive={archive} setArchive={setArchive} />

          <form method="post" onSubmit={isCreate ? handleAlert : handleDelete}>
            <DeleteButton isCreate={isCreate} />
          </form>
          <div className="flex-grow"></div>

          <button
            type="submit"
            form="edit"
            className="w-32 bg-blue-500 hover:bg-blue-600 font-semibold text-xl shadow tracking-wider text-white rounded-lg h-10 mr-8 border border-gray-500 flex-shrink-0 focus:outline-none hover:cursor-pointer"
          >
            Save
          </button>
        </div>

        <CodeArea archive={archive} setArchive={setArchive} onSubmit={handleSubmit} onChange={handleChange} />
      </div>
    </>
  );
};

export default Field;
