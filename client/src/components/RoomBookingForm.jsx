import { useState } from "react";
import apiRequest from "../lib/apiRequest";

const RoomBookingForm = ({ roomId }) => {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Reset message
    setError(null);   // Reset error

    try {
      const response = await apiRequest.post(`/rooms/${roomId}/book`, {
        arrivalDate,
        departureDate,
        numberOfAdults,
        numberOfChildren,
      });

      setMessage(response.data.message + " Go to your profile");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to book room.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Book a Room</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700">Arrival Date</label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Departure Date</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Number of Adults</label>
          <input
            type="number"
            min="1"
            value={numberOfAdults}
            onChange={(e) => setNumberOfAdults(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Number of Children</label>
          <input
            type="number"
            min="0"
            value={numberOfChildren}
            onChange={(e) => setNumberOfChildren(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
        >
          Book Room
        </button>
      </form>
    </div>
  );
};

export default RoomBookingForm;
