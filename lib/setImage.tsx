import Image from 'next/image';

export default function setImage(language: string) {
  switch (language) {
    case 'go':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={30} />;
    case 'typescript':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={26} />;
    case 'python':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={25} />;
    case 'rust':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={25} />;
    case 'ruby':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={25} />;
    case 'php':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={30} />;
    case 'swift':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={25} />;
    case 'kotlin':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={25} />;
    case 'c':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={25} />;
    case 'csharp':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={25} />;
    case 'cpp':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={25} />;
    case 'jsx':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={25} />;
    case 'docker':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={30} />;
    case 'yaml':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={27} />;
    case 'sql':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={25} />;
    case 'html':
      return <Image src={`/images/languages/${language}.svg`} alt={language} width={35} height={25} />;
    default:
      return <Image src={`/images/languages/plane.svg`} alt={'📄'} width={35} height={25} />;
  }
  return;
}
