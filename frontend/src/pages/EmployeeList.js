import React, { useState, useEffect } from "react";
import { getTimeAndDateString } from "../utils/helper.js";
import { Link } from "react-router-dom";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2;

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/employee/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Employee deleted successfully");
        setEmployees(employees.filter((emp) => emp._id !== id));
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL +
            `/employee?page=${currentPage}&limit=${limit}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setEmployees(data?.employees);
        setTotalPages(Math.ceil(data?.totalCount / limit));
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-2 my-2">
      <div className="flex my-2 justify-center">
        <p className="font-bold text-3xl">Employee List</p>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Unique Id
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Mobile No
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Designation
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Course
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Create Date
            </th>
            <th className="px-6 py-3 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {employee._id}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                <img
                  className="h-10 w-10 rounded-full"
                  src={employee.image}
                  alt={employee.name}
                />
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {employee.name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {employee.email}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {employee.phone}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {employee.designation}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {employee.gender}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {employee.course}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {getTimeAndDateString(employee.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <Link
                  to={"/employee/" + employee._id}
                  className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteEmployee(employee._id)}
                  className="ml-4 text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-5 font-medium ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
          }`}
        >
          Previous
        </button>
        <span className="text-sm leading-5 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`ml-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-5 font-medium ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
