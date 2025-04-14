import React from "react";
import { Home, Briefcase, FileText } from "lucide-react";

const Navbar = ({ activePage, setActivePage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div className="container mx-auto flex justify-center space-x-8 py-4">
        <button
          onClick={() => setActivePage("home")}
          className={`flex items-center ${
            activePage === "home"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
        >
          <Home className="mr-2 w-5 h-5" /> Home
        </button>
        <button
          onClick={() => setActivePage("internship")}
          className={`flex items-center ${
            activePage === "internship"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
        >
          <Briefcase className="mr-2 w-5 h-5" /> Your Internship
        </button>
        <button
          onClick={() => setActivePage("report")}
          className={`flex items-center ${
            activePage === "report"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
        >
          <FileText className="mr-2 w-5 h-5" /> Submit Report
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
