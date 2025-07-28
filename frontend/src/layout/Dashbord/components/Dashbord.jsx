import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../Sidebar";
import { Navbar } from "../../Navbar";

const Dashboard = ({ pages }) => {
  const currentPage = useSelector((state) => state.sidebar.page);
  const currentMenu = useSelector((state) => state.sidebar.menu);
  const [isSidebarOpen, setIsSidebarOpen] = useState(currentMenu);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setIsSidebarOpen(currentMenu);
  }, [currentMenu]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#1a202e] text-white">
        <h1 className="text-3xl font-bold mb-4">
          You are not logged in. Please log in!
        </h1>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`h-full max-md:absolute z-50 shadow-lg ${
          isSidebarOpen ? "md:w-auto" : "md:w-[23%]"
        }`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col h-full">
        <Navbar className="shadow-md" />
        <div className="overflow-y-auto no-scrollbar flex-grow shadow-lg">
          {pages[currentPage] || pages["Dashboard"]}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
