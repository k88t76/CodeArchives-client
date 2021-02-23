import React, { useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { createArchive } from '../lib/archive';
import HeaderLogin from '../components/headerLogin';
import Layout from '../components/layout';
import Prism from '../public/js/prism.js';

const url = 'https://codearchives-server.dt.r.appspot.com';

export default function AddArchive({ name }: { name: string }) {
  const [archive, setArchive] = useState({
    content: '',
    title: '',
    author: name,
    language: '',
  });

  const [response, setResponse] = useState({
    type: '',
    message: '',
  });

  const [height, setHeight] = useState('a');

  const handleChange = (e) => {
    setArchive({ ...archive, [e.target.name]: e.target.value });
    setTimeout(Prism.highlightAll, 0);
    var txt = archive.content;
    var lines = txt.split('\n').length;
    if (lines > 33) {
      setHeight('a'.repeat((lines - 33) / 2 + 1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createArchive(archive);

    if (res === 200) {
      Router.push('/');
    } else {
      setResponse({
        type: 'error',
        message: 'Bad Request',
      });
    }
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
    }
    */
  };

  const handleLoad = () => {
    /*var txt = (document.getElementById('textarea') as HTMLTextAreaElement).value;
    var lines = txt.split('\n').length;
    if (lines > 33) {
      setHeight('a'.repeat((lines - 33) / 2 + 1));
    }
    */
  };

  const handleBacktoHome = (e) => {
    e.preventDefault();
    setTimeout(Prism.highlightAll, 1);
    Router.push('/');
  };

  return (
    <Layout>
      <Head>
        <title>{archive.title}</title>
      </Head>
      <header className="header">
        <HeaderLogin />
      </header>
      <div onLoad={handleLoad} className="pt-24 px-5">
        <div className="flex items-center justify-center bg-blue-600 -ml-5 pr-8 pl-3 fixed z-40 w-full top-10 h-10">
          <button type="submit" onClick={handleBacktoHome} className="flex mr-4 -ml-8 hover:cursor-pointer">
            <p className="-mt-4 -mr-7 text-xs font-bold text-white">Home</p>
            <Image src="/images/home.png" alt="back to Home" width={26} height={26} />
          </button>

          <button type="submit" className="w-10  flex z-50 top-12 hover:cursor-not-allowed focus:outline-none">
            <p className="-mt-4 -mr-8 text-xs font-bold text-white">Delete</p>
            <Image src="/images/trush.png" alt="Delete" width={26} height={26} />
          </button>
          <input
            type="text"
            name="title"
            className="flex text-center w-38 px-1  ml-1 mr-5 z-50 h-6"
            spellCheck={false}
            value={archive.title}
            placeholder="Title"
            required={true}
            onChange={handleChange}
          />

          <select id="language" className="flex z-50 mr-1 px-1 mt-0.5 text-sm h-6" onChange={handleLanguage}>
            <option>Language</option>
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

          <button type="submit" form="create" className="z-50 flex -mr-40 px-2 pt-0.5 focus:outline-none">
            <p className="-mt-4 -mr-6 text-xs font-bold text-white">Save</p>
            <Image src="/images/check.png" alt="Edit" width={24} height={24} />
          </button>
        </div>

        <div className={`code h-200`}>
          <pre>
            <code id="code" className={`language-${archive.language} w-full`}>
              {archive.content}
            </code>
          </pre>

          <form id="create" action={`${url}/create`} method="post" onSubmit={handleSubmit}>
            <pre>
              <textarea
                id="textarea"
                className={`codeArea h-200`}
                name="content"
                aria-required={true}
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
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const token: string = req.cookies.token || '';
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
}
