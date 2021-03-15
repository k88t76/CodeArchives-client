import React, { useState } from 'react';
import Image from 'next/image';
import Prism from '../public/js/prism.js';
import { Archive, fetchArchives } from '../lib/archive';

const url = process.env.NEXT_PUBLIC_URL;

interface Props {
  setArchives: React.Dispatch<React.SetStateAction<Archive[]>>;
  token: string;
}

const Search: React.FC<Props> = ({ setArchives, token }) => {
  const [search, setSearch] = useState<string>('');

  const handleChange = (e) => setSearch(e.target.value);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchArchives(token, search);
    setArchives(data);
  };

  const cancelSearch = async (e) => {
    e.preventDefault();
    var textForm = document.getElementById('form1') as HTMLInputElement;
    textForm.value = '';
    const data = await fetchArchives(token);
    setArchives(data);
  };

  return (
    <div className="flex fixed right-2 top-20 mr-6 transform -translate-y-0.5 z-40">
      <form action={`${url}/search/`} method="post" onSubmit={handleSearch}>
        <input
          className="flex z-50 text-black shadow w-72 rounded-lg  border border-gray-600 p-2 focus:outline-none"
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
        <button type="submit" className="flex mt-2.5 -ml-16 focus:outline-none">
          <Image src="/images/cancel.png" alt="×" width={26} height={26} />
        </button>
      </form>
    </div>
  );
};

export default Search;
