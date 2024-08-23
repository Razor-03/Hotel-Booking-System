import { useState, useEffect } from "react";
import apiRequest from "../lib/apiRequest";

function ManageBookings() {
  const [bookings, setBookings] = useState([{
    _id: "",
    room: { roomNo: "" },
    user: { username: "" },
    bookingStatus: "",
  }]);

  useEffect(() => {
    async function fetchBookings() {
      const response = await apiRequest.get("/bookings?bookingStatus=Pending");
      console.log(response.data);
      setBookings(response.data);
    }
    fetchBookings();
  }, []);

  const handleApproveBooking = async (id) => {
    await apiRequest.put(`/bookings/${id}/approve`);
    setBookings(
      bookings.map((booking) =>
        booking._id === id ? { ...booking, bookingStatus: "approved" } : booking
      )
    );
    window.location.reload();
  };

  const handleRejectBooking = async (id) => {
    await apiRequest.put(`/bookings/${id}/reject`);
    setBookings(
      bookings.map((booking) =>
        booking._id === id ? { ...booking, bookingStatus: "rejected" } : booking
      )
    );
    window.location.reload();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>
      <ul className="divide-y">
        {bookings ? (
          bookings.map((booking) => (
            <li
              key={booking._id}
              className="py-4 flex justify-between items-center"
            >
              <span>
                Room {booking.room.roomNo} for {booking.user.username} -{" "}
                {booking.bookingStatus}
              </span>
              <div className="space-x-4">
                <button
                  onClick={() => handleApproveBooking(booking._id)}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRejectBooking(booking._id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No pending bookings</p>
        )}
      </ul>
    </div>
  );
}

export default ManageBookings;
