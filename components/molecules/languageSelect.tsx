import React, { memo, useEffect } from 'react';

interface Props {
  language: string;
}

export const LanguageSelect: React.VFC<Props> = memo(({ language }) => {
  return (
    <>
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
    </>
  );
});
