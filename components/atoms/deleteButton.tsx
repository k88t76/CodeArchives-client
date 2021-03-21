import Image from 'next/image';
import React, { memo } from 'react';

interface Props {
  isCreate: boolean;
}

export const DeleteButton: React.VFC<Props> = memo(({ isCreate }) => {
  return (
    <button
      type="submit"
      className={`z-50 mt-2 -ml-3 w-10 focus:outline-none ${
        isCreate ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'
      }`}
    >
      <Image src={`/images/trush.png`} alt="🗑" width={30} height={30} />
    </button>
  );
});
