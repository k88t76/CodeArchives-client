import React, { useState } from 'react';
import Image from 'next/image';
import Prism from '../public/js/prism.js';
import { Archive, fetchArchives } from '../lib/archive';

const url = 'https://codearchives-server.dt.r.appspot.com';

interface Props {
  setArchives: React.Dispatch<React.SetStateAction<Archive[]>>;
  token: string;
}

const Search: React.FC<Props> = ({ setArchives, token }) => {
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
    <div className="flex md:mr-6 mr-72 transform -translate-y-0.5 z-50">
      <form action={`${url}/search/`} method="post" onSubmit={handleSearch}>
        <input
          className="flex z-50 text-black shadow w-72 rounded border-0 p-2 "
          id="form1"
          type="text"
          placeholder="Search"
          name="search"
          onChange={handleChange}
          required
        />

        <button type="submit" className="flex ml-64 w-25  -mt-8 text-2xl z-50 focus:outline-none">
          <Image src="/images/search.png" alt="🔎" width={25} height={25} />
        </button>
      </form>

      <form onSubmit={cancelSearch}>
        <button type="submit" className="flex mt-3 -ml-16 focus:outline-none">
          <Image src="/images/cancel-btn.png" alt="×" width={21} height={21} />
        </button>
      </form>
    </div>
  );
};

export default Search;
