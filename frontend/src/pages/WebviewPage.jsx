import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsheetLinkAtom } from "../atom/gsheet.atom";

export const WebviewPage = () => {
  const navigate = useNavigate();
  const webviewRef = useRef(null);
  const [googleSheetUrl, setGoogleSheetUrl] = useAtom(gsheetLinkAtom);

  useEffect(() => {
    // You can add event listeners or manipulate the webview here if necessary
    if (webviewRef.current) {
      webviewRef.current.addEventListener("did-finish-load", () => {
        webviewRef.current
          .executeJavaScript(
            `
          const style = document.createElement('style');
          style.textContent = "div#docs-chrome { pointer-events: none; }";
          document.head.appendChild(style);
        `
          )
          .then(() => {
            console.log("Custom CSS injected successfully!");
          })
          .catch((error) => {
            console.error("Failed to inject CSS:", error);
          });
      });
    }
  }, []);

  const handleExit = () => {
    setGoogleSheetUrl("");
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="p-4 flex justify-between">
        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
        <button
          className="btn btn-error btn-sm text-white"
          onClick={handleExit}
        >
          Exit
        </button>
      </div>
      <webview
        ref={webviewRef}
        src={googleSheetUrl}
        className="w-screen h-screen"
      />
    </div>
  );
};
