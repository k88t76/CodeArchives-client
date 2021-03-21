import React, { memo, useEffect } from 'react';

interface Props {
  onChangeLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  language: string;
}

export const LanguageSelect: React.VFC<Props> = memo(({ onChangeLanguage, language }) => {
  const handleSetSelected = () => {
    if (language !== '') {
      const option = document.getElementById(`${language}`) as HTMLOptionElement;
      option.selected = true;
    }
  };

  useEffect(() => {
    handleSetSelected();
  }, []);
  return (
    <select
      id="language"
      className="flex z-50 mt-0.5 mr-6 border-2 sm:w-64 w-20 px-2 h-10 rounded"
      onChange={onChangeLanguage}
    >
      {language === '' && <option>Language</option>}
      <option id="go" value="go">
        Go
      </option>
      <option id="typescript" value="typescript">
        TypeScript
      </option>
      <option id="python" value="python">
        Python
      </option>
      <option id="rust" value="rust">
        Rust
      </option>
      <option id="ruby" value="ruby">
        Ruby
      </option>
      <option id="php" value="php">
        PHP
      </option>
      <option id="swift" value="swift">
        Swift
      </option>
      <option id="kotlin" value="kotlin">
        Kotlin
      </option>
      <option id="c" value="c">
        C
      </option>
      <option id="csharp" value="csharp">
        C#
      </option>
      <option id="cpp" value="cpp">
        C++
      </option>
      <option id="jsx" value="jsx">
        JSX
      </option>
      <option id="docker" value="docker">
        Dockerfile
      </option>
      <option id="yaml" value="yaml">
        YAML
      </option>
      <option id="sql" value="sql">
        SQL
      </option>
      <option id="html" value="html">
        HTML
      </option>
      <option id="text" value="text">
        TEXT
      </option>
    </select>
  );
});
