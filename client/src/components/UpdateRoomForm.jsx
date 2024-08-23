import React, { useState, useEffect } from "react";
import apiRequest from "../lib/apiRequest"; 
import { useNavigate, useParams } from "react-router-dom";

const UpdateRoomForm = () => {
  const [room, setRoom] = useState({
    roomNo: "",
    roomType: "Single", 
    floor: "",
    pricePerNight: "",
    description: "",
    availabilityStatus: true,
    servantName: "",
    servantContact: "",
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await apiRequest.get(`/rooms/${id}`);
        setRoom(response.data);
      } catch (err) {
        setError("Failed to fetch room details. " + err.response.data.error);
      }
    };
    fetchRoomDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({
      ...prev,
      [name]: name === "availabilityStatus" ? e.target.checked : value, // Handle checkbox specifically
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest.put(`/rooms/${id}`, room);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Failed to update room. " + err.response.data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Room</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Room Number</label>
          <input
            type="text"
            name="roomNo"
            value={room.roomNo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Room Type</label>
          <select
            name="roomType"
            value={room.roomType}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Floor</label>
          <input
            type="text"
            name="floor"
            value={room.floor}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price per Night</label>
          <input
            type="number"
            name="pricePerNight"
            value={room.pricePerNight}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={room.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Availability Status</label>
          <input
            type="checkbox"
            name="availabilityStatus"
            checked={room.availabilityStatus}
            onChange={handleChange}
            className="mt-1"
          />
          <span className="ml-2">Available</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Servant Name</label>
          <input
            type="text"
            name="servantName"
            value={room.servantName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Servant Contact</label>
          <input
            type="text"
            name="servantContact"
            value={room.servantContact}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Update Room
        </button>
      </form>
    </div>
  );
};

export default UpdateRoomForm;
