import { useState } from "react";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom"; 

const AddRoomForm = () => {
    const [room, setRoom] = useState({
      roomNo: "",
      roomType: "Single", // Default value for roomType
      floor: "",
      pricePerNight: "",
      roomImages: [""], // Initialize with an empty string to handle the first image URL input
      description: "",
      servantName: "",
      servantContact: "",
    });
  
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate for redirection
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setRoom((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleImageChange = (index, value) => {
      const newImages = [...room.roomImages];
      newImages[index] = value;
      setRoom((prev) => ({
        ...prev,
        roomImages: newImages,
      }));
    };
  
    const handleAddImageField = () => {
      setRoom((prev) => ({
        ...prev,
        roomImages: [...prev.roomImages, ""], // Add a new empty input field
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await apiRequest.post("/rooms", room);
        navigate("/admin/dashboard"); // Redirect to dashboard after adding the room
      } catch (err) {
        setError("Failed to add room. " + err.response.data.error);
      }
    };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Room</h2>
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
          <label className="block text-gray-700">Room Images (URLs)</label>
          {room.roomImages.map((image, index) => (
            <input
              key={index}
              type="text"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="mt-1 p-2 w-full border rounded mb-2"
              placeholder={`Image URL ${index + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={handleAddImageField}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Add Another Image
          </button>
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
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;
