import React, { memo } from 'react';

interface Props {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TitleInput: React.VFC<Props> = memo(({ title, onChange }) => {
  return (
    <input
      type="text"
      name="title"
      className="sm:w-72 w-20 pl-2 mt-0.5 mr-5 z-50 h-10 border-2 rounded"
      spellCheck={false}
      value={title}
      placeholder="Title"
      onChange={onChange}
    />
  );
});
