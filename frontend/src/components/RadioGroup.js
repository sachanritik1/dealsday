import React, { useState } from "react";

const RadioGroup = ({ label, setItem, options }) => {
  const [selectedGender, setSelectedGender] = useState(null);

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
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              name={option}
              value={option}
              checked={selectedGender === option}
              onChange={() => {
                setItem(option);
                setSelectedGender(option);
              }}
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
