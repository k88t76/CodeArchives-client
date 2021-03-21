import React, { memo } from 'react';

export const SaveButton: React.VFC = memo(() => {
  return (
    <button
      type="submit"
      form="edit"
      className="w-32 bg-blue-500 hover:bg-blue-600 font-semibold text-xl shadow tracking-wider text-white rounded-lg h-10 mr-8 border border-gray-500 flex-shrink-0 focus:outline-none hover:cursor-pointer"
    >
      Save
    </button>
  );
});
