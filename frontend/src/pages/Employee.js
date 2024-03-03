import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";

const Employee = () => {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const phone = React.useRef();
  const [designation, setDesignation] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [course, setCourse] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const { id } = useParams();
  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/employee/" + id,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.success) {
          nameRef.current.value = data.employee.name;
          emailRef.current.value = data.employee.email;
          phone.current.value = data.employee.phone;
          setDesignation(data.employee.designation);
          setGender(data.employee.gender);
          setCourse(data.employee.course);
          setImage(data.employee.image);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }
    fetchEmployee();
  }, []);

  const handleSubmit = async (e) => {
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
        process.env.REACT_APP_API_URL + "/employee/" + id,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        }
      );
      const json = await response.json();
      if (json.success) {
        alert("Employee updated successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating employee");
    }
  };

  return (
    <div className="mt-4 flex justify-evenly items-center">
      <img className="h-96 w-96 rounded-full" src={image} alt="Employee" />
      <EmployeeForm
        label={"Update Employee Details"}
        handleSubmit={handleSubmit}
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

export default Employee;
