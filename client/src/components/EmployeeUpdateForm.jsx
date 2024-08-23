import { useState, useEffect } from "react";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EmployeeUpdateForm = () => {
  const {id: employeeId} = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    image: "",
    cnic: "",
    contact: "",
    email: "",
    salary: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await apiRequest.get(`/employees/${employeeId}`);
        setEmployee(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch employee data.");
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiRequest.put(
        `/employees/${employeeId}`,
        employee
      );
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update employee.");
    }
  };

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Update Employee</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image URL</label>
        <input
          type="text"
          name="image"
          value={employee.image}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">CNIC</label>
        <input
          type="text"
          name="cnic"
          value={employee.cnic}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Contact</label>
        <input
          type="text"
          name="contact"
          value={employee.contact}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Salary</label>
        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
      >
        Update
      </button>
    </form>
  );
};

export default EmployeeUpdateForm;
