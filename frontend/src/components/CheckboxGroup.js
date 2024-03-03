import React, { useState } from "react";

const CheckboxGroup = ({ label, item, setItem, options }) => {
  return (
    <div className="my-2">
      <label
        htmlFor={label}
        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
      >
        {label}
      </label>
      <div>
        {options?.map((option) => (
          <label className="inline-flex items-center mr-4" key={option}>
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600"
              name={option}
              value={option}
              checked={item === option}
              onChange={() => setItem(option)}
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
