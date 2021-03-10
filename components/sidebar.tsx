import Link from 'next/link';
import React from 'react';
import { Archive } from '../lib/archive';

interface Props {
  archives: Archive[];
}

const Sidebar: React.FC<Props> = ({ archives }) => {
  return (
    <div className="sm:inline-block hidden">
      <aside className="sidebar pb-12 bg-gray-100 flex-shrink-0 h-screen sticky overflow-y-scroll top-0">
        <div className="flex  text-2xl font-bold ml-8 mt-16 mb-6">
          <p> Archives</p>
        </div>
        <nav className="ml-8 mr-12 font-semibold z-50">
          <ul>
            {archives.map(({ uuid, title }) => (
              <li key={uuid} className="mt-2.5 w-36 overflow-hidden overflow-ellipsis">
                <Link href={`/archives/${uuid}`}>
                  <a href="#" className="w-36 text-gray-700">
                    {title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
