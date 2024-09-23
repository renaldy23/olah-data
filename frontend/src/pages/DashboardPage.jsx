import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsheetAtom, gsheetLinkAtom } from "../atom/gsheet.atom";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const setGsheetLink = useSetAtom(gsheetLinkAtom);

  const [gsheetValue, setGsheetValue] = useState({});
  const handlePage = (url) => {
    setGsheetLink(url);
    navigate("/webview");
  };

  const handleLougut = () => {
    localStorage.removeItem("gsheet");
    navigate("/");
  };

  useEffect(() => {
    console.log(gsheetValue);
    const data = JSON.parse(localStorage.getItem("gsheet"));
    console.log(data);
    setGsheetValue(data);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#080808] p-10 rounded-lg shadow-lg w-[500px] text-center">
        <div className="flex flex-col space-y-6">
          <h1 className="text-2xl text-white font-bold">Available Link</h1>
          {Object.keys(gsheetValue).length != 0 ? (
            gsheetValue.urls.map((url, index) => (
              <button
                key={index}
                className={
                  url.url
                    ? "btn btn-primary !text-white"
                    : "btn btn-neutral !text-white"
                }
                onClick={() => handlePage(url.url)}
                disabled={!url.url}
              >
                {url.name || "Not Available"}
              </button>
            ))
          ) : (
            <p className="text-white">No available link</p>
          )}
          <hr className="border-gray-600 my-4" />
          <button className="btn btn-error text-white" onClick={handleLougut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
