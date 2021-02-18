import Link from 'next/link';
import { Archive } from '../lib/archive';

export default function Contents({ archives }: { archives: Archive[] }) {
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
}
