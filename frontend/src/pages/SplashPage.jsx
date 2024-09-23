import React, { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import logo from "../assets/logo.png";
export const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const gsheetLink = JSON.parse(localStorage.getItem("gsheetLink"));
    const gsheetData = JSON.parse(localStorage.getItem("gsheet"));
    setTimeout(() => {
      const expiredDate = new Date(gsheetData.expire_date);
      const currentDate = new Date();

      if (currentDate > expiredDate) {
        navigate("/activation");
      }
      if (gsheetLink !== null && gsheetLink !== "") {
        navigate("/webview");
      } else if (gsheetData.status === "ACTIVE") {
        navigate("/dashboard");
      } else {
        navigate("/activation");
      }
    }, 2000);
  }, []);

  return (
    <div className="h-screen bg-[#121212] flex justify-center items-center flex-col space-y-10">
      <img src={logo} className="w-80" />
    </div>
  );
};
