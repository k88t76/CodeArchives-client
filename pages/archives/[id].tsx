import React, { useState, useEffect, PropsWithChildren } from 'react';
import Layout from '../../components/layout';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import HeaderLogin from '../../components/headerLogin';
import Prism from '../../public/js/prism.js';
import { Archive, editArchive, deleteArchive } from '../../lib/archive';
import setImageDetail from '../../lib/setImageDetail';

//const url = 'https://codearchives-server.dt.r.appspot.com';
const url = 'http://localhost:8080';

interface Props {
  data: Archive;
  id: string;
}

const Content: NextPage<Props> = ({ data, id }) => {
  const [archive, setArchive] = useState({
    content: data && data.content,
    title: data && data.title,
    author: data && data.author,
    language: data && data.language,
  });

  //const [height, setHeight] = useState<string>('a');

  const [response, setResponse] = useState({
    type: '',
    message: '',
  });

  const handleChange = (e) => {
    setArchive({ ...archive, [e.target.name]: e.target.value });
    setTimeout(Prism.highlightAll, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await editArchive(id, archive);
    if (res === 200) {
      Router.push('/');
    } else {
      setResponse({
        type: 'error',
        message: 'Edit failure',
      });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await deleteArchive(id);
    Router.push({
      pathname: '/',
      query: { type: 'success', response: `Archive has been deleted (title: ${archive.title})` },
    });
  };

  const handleLanguage = () => {
    const lan = (document.getElementById('language') as HTMLSelectElement).value;
    setArchive({
      content: archive.content,
      title: archive.title,
      author: archive.author,
      language: lan,
    });
    const target = document.getElementById('code') as HTMLDivElement;
    target.className = 'language-' + lan;
    Prism.highlightAll();
  };

  const handleKeydown = (e) => {
    var textarea = document.getElementById('textarea') as HTMLTextAreaElement;
    if (e.keyCode === 9) {
      e.preventDefault();
      const pos = textarea.selectionStart;
      textarea.value = textarea.value.substr(0, pos) + '\t' + textarea.value.substr(pos);
      setArchive({
        content: textarea.value,
        title: archive.title,
        author: archive.author,
        language: archive.language,
      });
      setTimeout(Prism.highlightAll, 0);
      textarea.focus();
      textarea.setSelectionRange(pos + 1, pos + 1);
    }
    /*var txt = (document.getElementById('textarea') as HTMLTextAreaElement).value;
    var lines = txt.split('\n').length;
    if (lines > 33) {
      setHeight('a'.repeat((lines - 33) / 2 + 1));
      const target = document.getElementById('textarea') as HTMLTextAreaElement;
      target.className = 'codeArea h-' + height;
    }
    */
  };

  const handleLoad = () => {
    /* var txt = (document.getElementById('textarea') as HTMLTextAreaElement).value;
    var lines = txt.split('\n').length;
    if (lines > 33) {
      setHeight('a'.repeat((lines - 33) / 2 + 1));
      const target = document.getElementById('textarea') as HTMLTextAreaElement;
      target.className = 'codeArea h-' + height;
    }
    */
  };

  const handleBacktoHome = (e) => {
    e.preventDefault();
    setTimeout(Prism.highlightAll, 0);
    Router.push('/');
  };

  const handleSetSelected = () => {
    if (archive.language) {
      const option = document.getElementById(`${archive.language}`) as HTMLOptionElement;
      option.selected = true;
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{archive.title}</title>
      </Head>
      <header className="header">
        <HeaderLogin />
      </header>
      <div onLoad={handleLoad} className="pt-24 px-5">
        {!data && (
          <>
            <div>This Archive has already been deleted.</div>
            <div className="text-blue-600 hover:cursor-pointer">
              <p onClick={handleBacktoHome}>← Back to home</p>
            </div>
          </>
        )}
        {data && (
          <div onLoad={handleSetSelected}>
            <div className="toolbar flex z-50 -ml-5 pl-3 py-3 fixed bg-white w-screen">
              <p className="mt-2 pl-4 mr-4 w-16">{setImageDetail(archive.language)}</p>
              <input
                type="text"
                name="title"
                className="sm:w-72 w-20 pl-2 mt-0.5 mr-5 z-50 h-10 border-2 rounded"
                spellCheck={false}
                value={archive.title}
                placeholder="Title"
                onChange={handleChange}
              />

              <select
                id="language"
                className="flex z-50 mt-0.5 mr-6 border-2 sm:w-64 w-20 px-2 h-10 rounded"
                onChange={handleLanguage}
              >
                <option id="go" value="go">
                  Go
                </option>
                <option id="typescript" value="typescript">
                  TypeScript
                </option>
                <option id="python" value="python">
                  Python
                </option>
                <option id="rust" value="rust">
                  Rust
                </option>
                <option id="ruby" value="ruby">
                  Ruby
                </option>
                <option id="php" value="php">
                  PHP
                </option>
                <option id="swift" value="swift">
                  Swift
                </option>
                <option id="kotlin" value="kotlin">
                  Kotlin
                </option>
                <option id="c" value="c">
                  C
                </option>
                <option id="csharp" value="csharp">
                  C#
                </option>
                <option id="cpp" value="cpp">
                  C++
                </option>
                <option id="jsx" value="jsx">
                  JSX
                </option>
                <option id="docker" value="docker">
                  Dockerfile
                </option>
                <option id="yaml" value="yaml">
                  YAML
                </option>
                <option id="sql" value="sql">
                  SQL
                </option>
                <option id="html" value="html">
                  HTML
                </option>
              </select>

              <form action={`${url}/delete/`} method="post" onSubmit={handleDelete}>
                <button type="submit" className="z-50 mt-2 w-10 hover:cursor-pointer focus:outline-none">
                  <Image src={`/images/trush.png`} alt="🗑" width={30} height={30} />
                </button>
              </form>
              <div className="flex-grow"></div>
              <button
                type="submit"
                className="w-32 bg-blue-500 font-semibold text-xl text-white rounded h-10 mr-8 border border-gray-600 flex-shrink-0 focus:outline-none"
              >
                {
                  //<Image src={`/images/check.svg`} alt="✅" width={30} height={40} />
                  'Save'
                }
              </button>
            </div>

            <div className={`code h-200 ml-4 mr-4`}>
              <div className="mt-12">
                <pre>
                  <code id="code" className={`language-${archive.language}`}>
                    {archive.content}
                  </code>
                </pre>
              </div>

              <form id="edit" action={`${url}/edit/${id}`} method="post" onSubmit={handleSubmit}>
                <pre>
                  <textarea
                    id="textarea"
                    className={`codeArea h-200 mt-8`}
                    name="content"
                    value={archive.content}
                    spellCheck={false}
                    autoFocus={true}
                    onChange={handleChange}
                    onKeyDown={handleKeydown}
                  />
                </pre>
              </form>
            </div>
          </div>
        )}
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
    revalidate: 1,
  };
};

export default Content;
