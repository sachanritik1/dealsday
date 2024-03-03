import React from "react";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import RadioGroup from "../components/RadioGroup";
import CheckboxGroup from "../components/CheckboxGroup";
import Button from "../components/Button";

const Dashboard = () => {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const phone = React.useRef();
  const [designation, setDesignation] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [course, setCourse] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("phone", phone.current.value);
    formData.append("gender", gender);
    formData.append("designation", designation);
    formData.append("course", course);
    formData.append("image", image);

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/employee/create",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        }
      );
      const json = await response.json();
      if (json.success) {
        nameRef.current.value = "";
        emailRef.current.value = "";
        phone.current.value = "";
        setDesignation(null);
        setGender(null);
        setCourse(null);
        setImage(null);
        alert("Employee created successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <p className="font-bold text-3xl">Welcome to Admin Panel!</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl mt-4 ">Create Employee</p>
        <form onSubmit={handleCreateEmployee}>
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
            reference={phone}
          />
          <Dropdown
            item={designation}
            setItem={setDesignation}
            label="Designation"
            options={["HR", "Manager", "Sales"]}
          />
          <RadioGroup
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
              required
              type={"file"}
              name={"image"}
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
          <Button type="submit" label="Create Employee" />
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
