import React from "react";

const Button = ({ label, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-indigo-600 rounded-lg text-white outline-none focus:bg-indigo-700 hover:bg-indigo-500"
    >
      {label}
    </button>
  );
};

export default Button;
