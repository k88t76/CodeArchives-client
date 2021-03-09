import Link from 'next/link';
import React from 'react';
import { Archive } from '../lib/archive';

interface Props {
  archives: Archive[];
}

const Sidebar: React.FC<Props> = ({ archives }) => {
  return (
    <aside className="bg-white w-60 h-screen sticky top-0">
      <div className="flex items-center justify-center mt-10">
        <a href="/">サイドバー</a>
      </div>
      <nav className="mt-10">{'メニュー'}</nav>
    </aside>
  );
};

export default Sidebar;
