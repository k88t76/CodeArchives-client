import React from 'react';
import Image from 'next/image';

interface Props {
  isLoading: boolean;
}

const Loading: React.FC<Props> = ({ isLoading }) => {
  return (
    <div className="fixed right-11 bottom-4">
      {isLoading && <Image src={`/images/Loading.gif`} alt="Loading..." width={35} height={35} />}
    </div>
  );
};

export default Loading;
