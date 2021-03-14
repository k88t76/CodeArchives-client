import React from 'react';
import Link from 'next/link';
import setImage from '../lib/setImage';
import { Archive } from '../lib/archive';

interface Props {
  archives: Archive[];
}

const Contents: React.FC<Props> = ({ archives }) => {
  return (
    <ul className="flex flex-wrap items-center pt-4 z-40">
      {archives.map(({ uuid, content, title, language }) => (
        <li key={uuid}>
          <div className="flex font-semibold text-gray-800 w-60 ml-8 overflow-ellipsis overflow-hidden whitespace-nowrap">
            <div className="mr-1 -mb-2">{setImage(language)}</div>
            {title}
          </div>
          <Link href={`/archives/${uuid}`}>
            <div className="container z-40">
              <pre>
                <code id="code" className={`language-${language}`}>
                  {content}
                </code>
              </pre>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Contents;
