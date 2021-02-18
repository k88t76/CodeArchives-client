import React from 'react';
import Image from 'next/image';
import Layout from '../../components/layout';
import Head from 'next/head';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import HeaderLogin from '../../components/headerLogin';
import Prism from '../../public/js/prism.js';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import { editArchive, deleteArchive } from '../../lib/archive';

const url = 'https://codearchives-server.dt.r.appspot.com';

export default function Content({
  data,
  id,
}: {
  data: {
    content: string;
    title: string;
    author: string;
    language: string;
  };
  id: string;
}) {
  const [archive, setArchive] = useState({
    content: data && data.content,
    title: data && data.title,
    author: data && data.author,
    language: data && data.language,
  });

  const [n, setN] = useState(45);

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
        message: 'Bad Request',
      });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await deleteArchive(id);
    Router.push({
      pathname: '/',
      query: { response: `Archive has deleted (title: ${archive.title})` },
    });
  };

  const handleLanguage = () => {
    const lan = (<HTMLInputElement>document.getElementById('language')).value;
    setArchive({
      content: archive.content,
      title: archive.title,
      author: archive.author,
      language: lan,
    });
    const target = <HTMLInputElement>document.getElementById('code');
    target.className = 'language-' + lan;
    Prism.highlightAll();
  };

  const handleKeydown = (e) => {
    var textarea = <HTMLInputElement>document.getElementById('textarea');
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
    var txt = (<HTMLInputElement>document.getElementById('textarea')).value;
    var lines = txt.split('\n').length;
    if (lines > 33) {
      if (lines % 2 === 1) {
        setN((3 * (lines - 33)) / 2 + 54);
      }
    }
  };

  const handleFocus = () => {
    var txt = (<HTMLInputElement>document.getElementById('textarea')).value;
    var lines = txt.split('\n').length;
    if (lines > 33) {
      if (lines % 2 === 1) {
        setN((3 * (lines - 33)) / 2 + 54);
      }
    }
  };

  const handleBacktoHome = (e) => {
    e.preventDefault();
    setTimeout(Prism.highlightAll, 1);
    Router.push('/');
  };

  const handleSetSelected = () => {
    if (archive.language) {
      (<HTMLInputElement>document.getElementById(`${archive.language}`)).selected = true;
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{archive.title}</title>
      </Head>
      <header className="header">
        <HeaderLogin />
      </header>
      <div className="pt-24 px-5">
        {!data && (
          <div>
            <div>This Archive has already been deleted.</div>
            <div className="text-blue-600 hover:cursor-pointer">
              <p onClick={handleBacktoHome}>← Back to home</p>
            </div>
          </div>
        )}
        {data && (
          <div onLoad={handleSetSelected}>
            <div className="flex items-center justify-center bg-blue-600 -ml-5 pr-8 pl-3 fixed z-40 w-full top-10 h-10">
              <p onClick={handleBacktoHome} className="flex mr-4 -ml-8 hover:cursor-pointer">
                <Image src="/images/home.png" alt="back to Home" width={26} height={26} />
              </p>
              <form action={`${url}/delete/`} method="post" onSubmit={handleDelete}>
                <button type="submit" className="w-10  flex z-50 top-12 focus:outline-none">
                  <Image src="/images/trush.png" alt="Delete" width={26} height={26} />
                </button>
              </form>
              <input
                type="text"
                name="title"
                className="flex text-center w-38 px-1 mr-2 z-50 h-6"
                spellCheck={false}
                value={archive.title}
                placeholder="Title"
                onChange={handleChange}
              />

              <select id="language" className="flex z-50 mx-1 px-1 mt-0.5 text-sm h-6" onChange={handleLanguage}>
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

              <button type="submit" form="edit" className="z-50 flex -mr-40 px-2 pt-0.5 focus:outline-none">
                <Image src="/images/check.png" alt="Edit" width={24} height={24} />
              </button>
            </div>

            <div className={`pa h-${String(n)}`}>
              <div className="w-full">
                <pre>
                  <code id="code" className={`language-${archive.language}`}>
                    {archive.content}
                  </code>
                </pre>
              </div>

              <br />

              <form id="edit" action={`${url}/edit/${id}`} method="post" onSubmit={handleSubmit}>
                <pre>
                  <textarea
                    id="textarea"
                    className={`codeArea absolute h-${String(
                      n
                    )} top-28 -mt-2 pl-2 z-30 w-screen text-transparent bg-transparent outline-none overflow-hidden`}
                    name="content"
                    value={archive.content}
                    spellCheck={false}
                    autoFocus={true}
                    onChange={handleChange}
                    onKeyDown={handleKeydown}
                    onFocus={handleFocus}
                  />
                </pre>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const res = await fetch(`${url}/archive/${id}`);
  const data = await res.json();
  return { props: { data, id }, revalidate: 1 };
}
