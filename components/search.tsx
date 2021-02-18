import React, { useState } from 'react';
import Image from 'next/image';
import Prism from '../public/js/prism.js';
import { Archive, fetchArchives } from '../lib/archive';

const url = 'https://codearchives-server.dt.r.appspot.com';

export default function Search({
  setArchives,
  token,
}: {
  setArchives: React.Dispatch<React.SetStateAction<Archive[]>>;
  token: string;
}) {
  const [search, setSearch] = useState('');

  const handleChange = (e) => setSearch(e.target.value);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchArchives(token, search);
    setArchives(data);
    Prism.highlightAll();
  };

  const cancelSearch = async (e) => {
    e.preventDefault();
    var textForm = document.getElementById('form1') as HTMLInputElement;
    textForm.value = '';
    const data = await fetchArchives(token);
    setArchives(data);
    Prism.highlightAll();
  };

  return (
    <div className="flex justify-end pr-6 z-30;">
      <form action={`${url}/search/`} method="post" onSubmit={handleSearch}>
        <div className="field">
          <input
            className="flex fixed z-30 text-xs border border-blue-500 pl-1 w-32 h-5 rounded"
            id="form1"
            type="text"
            placeholder="Search"
            name="search"
            onChange={handleChange}
            required
          />
        </div>

        <div className="pl-36">
          <button type="submit" className="flex fixed right-9 mt-0.5 z-20 focus:outline-none hover:bg-gray-50">
            <Image src="/images/search.png" alt="×" width={18} height={18} />
          </button>
        </div>
      </form>

      <form onSubmit={cancelSearch}>
        <button type="submit" className="flex fixed  right-16 mt-0.5 -mr-0.5 z-30 hover:bg-gray-100 focus:outline-none">
          <Image src="/images/cancel-btn.png" alt="×" width={18} height={18} />
        </button>
      </form>
    </div>
  );
}
