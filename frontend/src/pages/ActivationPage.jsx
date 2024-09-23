import React, { useState } from "react";

import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { gsheetAtom, tokenKey } from "../atom/gsheet.atom";

export const ActivationPage = () => {
  const navigate = useNavigate();
  const baseUrl =
    "https://api.steinhq.com/v1/storages/669173f94d11fd04f012d9f8/apidata_user";

  const [key, setKey] = useState("");
  const gsheetSetAtom = useSetAtom(gsheetAtom);
  const setTokenKey = useSetAtom(tokenKey);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const transformToSingleObject = (array) => {
    if (array.length === 0) return {};

    const obj = array[0]; // Assuming you only need the first object of the array
    const urls = [];

    // Create array of URL objects based on the available URLs and names
    for (let i = 1; i <= 5; i++) {
      const urlKey = `url${i === 1 ? "" : i}`;
      const urlNameKey = `url${i === 1 ? "" : i}_name`;

      urls.push({
        url: obj[urlKey] || "", // Ensure the value is at least an empty string
        name: obj[urlNameKey] || "", // Ensure the value is at least an empty string
      });
    }

    // Return new object structure
    return {
      client_email: obj.client_email,
      expire_date: obj.expire_date,
      key: obj.key,
      purchase_date: obj.purchase_date,
      status: obj.status,
      urls, // Insert the URL array here
    };
  };

  const handleSubmit = async () => {
    setIsError(false);
    const search = JSON.stringify({ key: key });
    const endpoint = `${baseUrl}?search=${search}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    const gsheet = transformToSingleObject(data);
    const expireDate = new Date(gsheet.expire_date);
    const currentDate = new Date();

    console.log(gsheet);

    if (currentDate > expireDate && gsheet.status === "DEACTIVED") {
      setIsError(true);
      setMessage("Activation Key has expired!");
      return;
    } else {
      gsheetSetAtom(gsheet);
      setTokenKey(key);

      navigate("/dashboard");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#080808] p-10 rounded-lg shadow-lg w-[500px] text-center">
        {/* Logo Section */}
        <img src={logo} alt="Logo" className="mx-auto mb-6 w-40" />
        <p className="text-gray-400 mb-6">Please enter your activation key!</p>

        {/* Input Field */}
        <input
          type="text"
          placeholder="johndoe123"
          className="input input-bordered w-full mb-4 bg-[#1a1a1a] text-white"
          onChange={(e) => setKey(e.target.value)}
        />

        {/* Activate Button */}
        <button
          onClick={handleSubmit}
          className="btn btn-primary text-white w-full bg-purple-600 border-none hover:bg-purple-700"
        >
          Activate
        </button>
      </div>
      {isError && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <span className="text-white">{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
