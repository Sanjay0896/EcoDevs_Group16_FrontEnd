import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();

  const storedDBData = JSON.parse(localStorage.getItem("storedDBData"));
  let isLandOwner = false;
  if (storedDBData) {
    isLandOwner = storedDBData.designation === "L";
  }

  const navigationLinks = [
    { path: "/", title: "Home" },
    { path: "/lands", title: "Explore Lands" },
    { path: "/digitalstorage", title: "Digital Storage" },
  ];

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const getActiveLinkStyles = ({ isActive }) =>
    isActive ? "text-teal-200" : "text-white hover:text-teal-200";

  return (
    <header
      className={`flex justify-between items-center px-8 lg:px-12 py-4 bg-green-900 text-white fixed w-full z-10 shadow-2xl transition-transform duration-300 ${
        showHeader ? "" : "-translate-y-full"
      }`}
    >
      <NavLink to="/" className="flex items-center space-x-3">
        <img src="./images/logo1.webp" alt="FarmTech logo" className="h-12" />
        <span className="text-xl font-bold">FARMTECH</span>
      </NavLink>
      <nav className="flex justify-center items-center gap-16 text-lg flex-1">
        {navigationLinks.map(({ path, title }) => (
          <NavLink key={path} to={path} className={getActiveLinkStyles}>
            {title}
          </NavLink>
        ))}
        {isLandOwner && (
          <NavLink to="/landposting" className={getActiveLinkStyles}>
            Postings
          </NavLink>
        )}
        <NavLink to="/crop-recommendation" className={getActiveLinkStyles}>
          Crop Recommendation
        </NavLink>
      </nav>
      {!storedDBData && (
        <NavLink
          to="/login"
          className="px-6 py-2 rounded-full shadow transition-all duration-300 ease-in-out hover:bg-opacity-90 bg-green-700 text-white font-semibold"
        >
          Login
        </NavLink>
      )}
      {storedDBData && (
        <button
          onClick={() => {
            localStorage.removeItem("storedDBData");
            navigate("/");
          }}
          className="px-6 py-2 rounded-full shadow transition-all duration-300 ease-in-out hover:bg-opacity-90 bg-green-700 text-white font-semibold"
          >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
