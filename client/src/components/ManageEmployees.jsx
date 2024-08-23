import { useState, useEffect } from "react";
import apiRequest from "../lib/apiRequest";
import { Link } from "react-router-dom";

function ManageEmployees() {
  const [employees, setEmployees] = useState([
    {
      name: "",
      image: "",
      cnic: "",
      contact: "",
      email: "",
      salary: "",
    },
  ]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    image: "",
    cnic: "",
    contact: "",
    email: "",
    salary: "",
  });

  useEffect(() => {
    async function fetchEmployees() {
      const response = await apiRequest.get(`/employees`);
      setEmployees(response.data);
    }
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async () => {
    const response = await apiRequest.post(`/employees`, newEmployee);
    setEmployees([...employees, response.data]);
    setNewEmployee({
      name: "",
      image: "",
      cnic: "",
      contact: "",
      email: "",
      salary: "",
    });
  };

  const handleDeleteEmployee = async (id) => {
    await apiRequest.delete(`/employees/${id}`);
    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Manage Employees</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={newEmployee.name}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Employee Image URL"
          value={newEmployee.image}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="cnic"
          placeholder="CNIC"
          value={newEmployee.cnic}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={newEmployee.contact}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={newEmployee.salary}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddEmployee}
          className="bg-blue-500 text-white p-2 rounded col-span-2"
        >
          Add Employee
        </button>
      </div>
      <ul className="divide-y">
        {employees.map((employee) => (
          <li
            key={employee._id}
            className="py-4 px-6 bg-white shadow rounded-lg flex justify-between items-center mb-4"
          >
            <div className="flex items-center">
              <img
                src={employee.image}
                alt={`${employee.name}'s avatar`}
                className="h-16 w-16 rounded-full mr-4 object-cover"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{employee.name}</h3>
                <p className="text-gray-600">CNIC: {employee.cnic}</p>
                <p className="text-gray-600">Email: {employee.email}</p>
                <p className="text-gray-600">Contact: {employee.contact}</p>
                <p className="text-gray-600">
                  Salary: ${employee.salary.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <Link
                to={`/updateEmployee/${employee._id}`}
                className="bg-green-600 p-2 rounded-md text-white"
              >
                Update
              </Link>
              <button
                onClick={() => handleDeleteEmployee(employee._id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition duration-200 ease-in-out"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageEmployees;
