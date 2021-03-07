import Link from 'next/link';
import React from 'react';
import { Archive } from '../lib/archive';

interface Props {
  archives: Archive[];
}

const Contents: React.FC<Props> = ({ archives }) => {
  return (
    <ul className="flex flex-wrap items-center pt-4 z-0">
      {archives.map(({ uuid, content, title, language }) => (
        <li key={uuid}>
          <Link href={`/archives/${uuid}`}>
            <div className="container">
              <pre>
                <code id="code" className={`language-${language}`}>
                  <a href="#">{content}</a>
                </code>
              </pre>
            </div>
          </Link>
          <div className="text-center mx-7 w-64 pl-12 overflow-hidden overflow-ellipsis">{title}</div>
        </li>
      ))}
    </ul>
  );
};

export default Contents;
