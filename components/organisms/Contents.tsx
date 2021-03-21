import React, { memo } from 'react';
import Link from 'next/link';
import { SetImage } from '../atoms/SetImage';
import { Archive } from '../../types/archive';

interface Props {
  archives: Archive[];
}

export const Contents: React.VFC<Props> = memo(({ archives }) => {
  return (
    <ul className="flex flex-wrap items-center pt-4 z-40">
      {archives.map(({ uuid, content, title, language }) => (
        <li key={uuid}>
          <div className="flex font-semibold text-gray-800 w-60 ml-8 overflow-ellipsis overflow-hidden whitespace-nowrap">
            <div className="mr-1 -mb-2">{<SetImage language={language} />}</div>
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
});
