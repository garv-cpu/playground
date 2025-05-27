import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";

const Preview = ({ html, css, js }) => {
  const iframeRef = useRef(null);

  const handleExport = () => {
    const iframeDoc = iframeRef.current?.contentWindow?.document;
    if (iframeDoc?.body) {
      html2canvas(iframeDoc.body).then((canvas) => {
        const link = document.createElement("a");
        link.download = "preview.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            body {
              padding: 1rem;
              font-family: 'Segoe UI', sans-serif;
              background: #f9fafb;
              color: #111827;
            }
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `);
    doc.close();
  }, [html, css, js]);

  return (
    <div className="border rounded-2xl shadow-xl backdrop-blur-md bg-white/10 overflow-hidden transition-all duration-300">
      <div className="flex justify-between items-center bg-gray-900 text-white p-3">
        <h2 className="text-lg font-semibold tracking-wide">Live Preview</h2>
        <button
          onClick={handleExport}
          className="px-4 py-1.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
        Export PNG
        </button>
      </div>
      <div className="bg-white">
        <iframe
          ref={iframeRef}
          title="Live Preview"
          className="w-full h-[600px] border-none"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};

export default Preview;
