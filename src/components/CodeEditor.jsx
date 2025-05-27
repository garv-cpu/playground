import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { githubLight } from "@uiw/codemirror-theme-github";
import { dracula } from "@uiw/codemirror-theme-dracula";

const CodeEditor = ({ title, language, value, onChange, theme }) => {
  const extensions = {
    html: html(),
    css: css(),
    javascript: javascript(),
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-800 text-white p-2">
        <span className="font-semibold">{title}</span>
      </div>
      <CodeMirror
        value={value}
        height="200px"
        theme={theme === "dark" ? dracula : githubLight}
        extensions={[extensions[language]]}
        onChange={(val) => onChange(val)}
      />
    </div>
  );
};

export default CodeEditor;
