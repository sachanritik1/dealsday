import React from "react";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import RadioGroup from "../components/RadioGroup";
import CheckboxGroup from "../components/CheckboxGroup";
import Button from "../components/Button";

const EmployeeForm = ({
  label,
  handleSubmit,
  nameRef,
  emailRef,
  phoneRef,
  designation,
  setDesignation,
  gender,
  setGender,
  course,
  setCourse,
  setImage,
}) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-xl mt-4 ">{label}</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          placeholder="John Doe"
          reference={nameRef}
        />
        <Input
          label="Email"
          type="email"
          placeholder="johndoe@xyz.com"
          reference={emailRef}
        />
        <Input
          label="Phone"
          type="text"
          placeholder="+919999999999"
          reference={phoneRef}
        />
        <Dropdown
          item={designation}
          setItem={setDesignation}
          label="Designation"
          options={["HR", "Manager", "Sales"]}
        />
        <RadioGroup
          item={gender}
          label={"Gender"}
          options={["Male", "Female"]}
          setItem={setGender}
        />
        <CheckboxGroup
          label="Courses"
          item={course}
          setItem={setCourse}
          options={["MCA", "BCA", "BSC"]}
        />

        <div className="mb-4">
          <label
            htmlFor={"image"}
            className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
          >
            {"Image"}
          </label>
          <input
            type={"file"}
            name={"image"}
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          />
        </div>
        <Button type="submit" label={label} />
      </form>
    </div>
  );
};

export default EmployeeForm;
