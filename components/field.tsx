import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import Prism from '../public/js/prism.js';
import { Archive, deleteArchive } from '../lib/archive';
import setImageDetail from '../lib/setImageDetail';
import Loading from '../components/loading';

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

  const handleLanguage = () => {
    const lan = (document.getElementById('language') as HTMLSelectElement).value;
    setArchive({
      uuid: archive.uuid,
      content: archive.content,
      title: archive.title,
      author: archive.author,
      language: lan,
      created_at: archive.created_at,
    });
    const target = document.getElementById('code') as HTMLDivElement;
    target.className = 'language-' + lan;
    if (lan == 'text') {
      target.className = '';
    }
  };

  const handleKeydown = (e) => {
    var textarea = document.getElementById('textarea') as HTMLTextAreaElement;
    if (e.keyCode === 9) {
      e.preventDefault();
      const pos = textarea.selectionStart;
      textarea.value = textarea.value.substr(0, pos) + '\t' + textarea.value.substr(pos);
      setArchive({
        uuid: archive.uuid,
        content: textarea.value,
        title: archive.title,
        author: archive.author,
        language: archive.language,
        created_at: archive.created_at,
      });
      setTimeout(Prism.highlightAll, 0);
      textarea.focus();
      textarea.setSelectionRange(pos + 1, pos + 1);
    }
  };

  const handleSetSelected = () => {
    if (archive.language) {
      const option = document.getElementById(`${archive.language}`) as HTMLOptionElement;
      option.selected = true;
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [archive]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div onLoad={handleSetSelected}>
        <div className="toolbar flex z-50 -ml-5 pl-3 py-3 fixed bg-white w-screen">
          <div className="mt-2 pl-4 mr-4 w-16 flex-shrink-0">{setImageDetail(archive.language)}</div>
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
            {!archive.language && <option>Language</option>}
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
            <option id="text" value="text">
              TEXT
            </option>
          </select>

          <form method="post" onSubmit={isCreate ? handleAlert : handleDelete}>
            <button
              type="submit"
              className={`z-50 mt-2 -ml-3 w-10 focus:outline-none ${
                isCreate ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'
              }`}
            >
              <Image src={`/images/trush.png`} alt="🗑" width={30} height={30} />
            </button>
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

        <div className={`code h-200 ml-4 mr-4`}>
          <div className="mt-12">
            <pre>
              <code id="code" className={`language-${archive.language}`}>
                {archive.content}
              </code>
            </pre>
          </div>

          <form id="edit" method="post" onSubmit={handleSubmit}>
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
    </>
  );
};

export default Field;
