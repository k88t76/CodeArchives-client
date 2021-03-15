import Image from 'next/image';

export default function setImagedetail(language: string) {
  switch (language) {
    case '':
    case 'text':
      return <Image src={`/images/languages/plane.svg`} alt={'📄'} width={35} height={32} />;

    case language:
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={32} />;
  }
  return;
}
