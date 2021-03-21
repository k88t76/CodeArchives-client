import Image from 'next/image';
import React, { memo } from 'react';

interface Props {
  language: string;
}

export const SetImageDetail: React.VFC<Props> = memo(({ language }) => {
  switch (language) {
    case '':
    case 'text':
      return <Image src={`/images/languages/plane.svg`} alt={'📄'} width={35} height={32} />;

    case language:
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={32} />;
  }
});
