import React, { useState, useEffect } from "react";
import { getTimeAndDateString } from "../utils/helper.js";
import { Link } from "react-router-dom";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL +
            `/employee?page=${currentPage}&limit=${limit}&sort=${sortKey}&order=${sortOrder}&search=${searchQuery}`,
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
  }, [currentPage, sortKey, sortOrder, searchQuery]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

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

  return (
    <div className="p-2 my-2">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 mb-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={() => setSearchQuery("")}
          className="p-2 mb-2 border border-gray-300 bg-slate-700 text-white rounded-md"
        >
          Clear
        </button>
      </div>
      <div className="flex my-2 justify-center">
        <p className="font-bold text-3xl">Employee List</p>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              onClick={() => handleSort("id")}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              Unique Id{" "}
              {sortKey === "id" ? (sortOrder === "asc" ? "▲" : "▼") : "▲▼"}
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th
              onClick={() => handleSort("name")}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              Name{" "}
              {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : "▲▼"}
            </th>
            <th
              onClick={() => handleSort("email")}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              Email{" "}
              {sortKey === "email" ? (sortOrder === "asc" ? "▲" : "▼") : "▲▼"}
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
            <th
              onClick={() => handleSort("createdAt")}
              className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              Create Date{" "}
              {sortKey === "createdAt"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : "▲▼"}
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
