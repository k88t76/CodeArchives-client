import React, { Dispatch, memo, SetStateAction } from 'react';
import { Archive } from '../../lib/archive';

interface Props {
  archive: Archive;
  setArchive: Dispatch<SetStateAction<Archive>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CodeArea: React.VFC<Props> = memo(({ archive, setArchive, onSubmit, onChange }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    var textarea = document.getElementById('textarea') as HTMLTextAreaElement;
    if (e.keyCode === 9) {
      e.preventDefault();
      const pos = textarea.selectionStart;
      textarea.value = textarea.value.substr(0, pos) + '\t' + textarea.value.substr(pos);
      setArchive({ ...archive, content: textarea.value });
      textarea.focus();
      textarea.setSelectionRange(pos + 1, pos + 1);
    }
  };

  const handleScroll = () => {
    const codearea = document.getElementById('code');
    const textarea = document.getElementById('textarea');

    codearea.addEventListener('scroll', () => {
      textarea.scrollTop = codearea.scrollTop;
      textarea.scrollLeft = codearea.scrollLeft;
    });

    textarea.addEventListener('scroll', () => {
      codearea.scrollTop = textarea.scrollTop;
      codearea.scrollLeft = textarea.scrollLeft;
    });
  };
  return (
    <div className={`code ml-4 mt-8 w-11/12`}>
      <div className="mt-12 -mr-9">
        <pre className="h-39">
          <code id="code" className={`language-${archive.language} w-full  overflow-scroll`}>
            {archive.content}
          </code>
        </pre>
      </div>

      <form id="edit" method="post" onSubmit={onSubmit}>
        <textarea
          id="textarea"
          className={`codeArea overflow-scroll w-11/12 h-39 mt-8  resize-none`}
          name="content"
          value={archive.content}
          spellCheck={false}
          autoFocus={true}
          wrap="off"
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
        />
      </form>
    </div>
  );
});
