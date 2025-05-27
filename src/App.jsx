// src/App.jsx
import { useState, useEffect } from "react";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import ThemeToggle from "./components/ThemeToogle";

const App = () => {
  // State for code
  const [html, setHtml] = useState(
    localStorage.getItem("html") || "<h1>Hello World</h1>"
  );
  const [css, setCss] = useState(
    localStorage.getItem("css") || "h1 { color: blue; }"
  );
  const [js, setJs] = useState(
    localStorage.getItem("js") || "console.log('Hello!');"
  );
  const [theme, setTheme] = useState("dark");

  // Persist code to localStorage
  useEffect(() => {
    localStorage.setItem("html", html);
    localStorage.setItem("css", css);
    localStorage.setItem("js", js);
  }, [html, css, js]);

  // Handle sharing via URL
  const shareCode = () => {
    try {
      const encoded = encodeURIComponent(
        btoa(unescape(encodeURIComponent(JSON.stringify({ html, css, js }))))
      );
      const url = `${window.location.origin}${window.location.pathname}?code=${encoded}`;

      // Try to use Clipboard API
      navigator.clipboard
        .writeText(url)
        .then(() => alert("🔗 Shareable link copied to clipboard!"))
        .catch(() => {
          // Fallback if Clipboard API fails
          prompt("Copy the link below:", url);
        });
    } catch (e) {
      console.error("Failed to generate shareable link", e);
      alert("⚠️ Failed to generate link");
    }
  };

  // Load code from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      try {
        const { html: h, css: c, js: j } = JSON.parse(decodeURIComponent(escape(atob(code))));
        setHtml(h);
        setCss(c);
        setJs(j);
      } catch (e) {
        console.error("Invalid share link");
      }
    }
  }, []);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Playground</h1>
          <div className="flex gap-4">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <button
              onClick={shareCode}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Share
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <CodeEditor
              title="HTML"
              language="html"
              value={html}
              onChange={setHtml}
              theme={theme}
            />
            <CodeEditor
              title="CSS"
              language="css"
              value={css}
              onChange={setCss}
              theme={theme}
            />
            <CodeEditor
              title="JavaScript"
              language="javascript"
              value={js}
              onChange={setJs}
              theme={theme}
            />
          </div>
          <Preview html={html} css={css} js={js} />
        </div>
      </div>
    </div>
  );
};

export default App;
