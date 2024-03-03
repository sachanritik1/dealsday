import React, { useState, useEffect } from "react";

const Dropdown = ({ setItem, label, options, item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    setTimeout(() => {
      if (event.target !== document.getElementById("dropdown-btn")) {
        setIsOpen(false);
      }
    }, 300);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <label
        htmlFor={label}
        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
      >
        {label}
      </label>
      <button
        id="dropdown-btn"
        onClick={toggleDropdown}
        className="w-48 px-4 py-2 text-sm font-semibold text-gray-700 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
      >
        {!item ? "Select" : item} {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
          {options?.map((option) => (
            <p
              key={option}
              onClick={(e) => {
                setIsOpen(false);
                setItem(option);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
