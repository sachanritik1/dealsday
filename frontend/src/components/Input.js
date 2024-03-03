import React from "react";

const Input = ({ label, type, placeholder, reference }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
      >
        {label}
      </label>
      <input
        required
        type={type}
        name={label}
        id={label}
        placeholder={placeholder}
        ref={reference}
        className="w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
      />
    </div>
  );
};

export default Input;
