import React from "react";

import EmployeeForm from "../components/EmployeeForm";

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
      alert("Failed to create employee");
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <p className="font-bold text-3xl">Welcome to Admin Panel!</p>
      </div>

      <EmployeeForm
        label={"Create Employee"}
        handleSubmit={handleCreateEmployee}
        nameRef={nameRef}
        emailRef={emailRef}
        phoneRef={phone}
        designation={designation}
        setDesignation={setDesignation}
        gender={gender}
        setGender={setGender}
        course={course}
        setCourse={setCourse}
        setImage={setImage}
      />
    </div>
  );
};

export default Dashboard;
