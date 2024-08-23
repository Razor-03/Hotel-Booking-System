import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../lib/apiRequest";

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiRequest.get("/users/bookings");
        setBookings(response.data);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
      }
    };

    fetchBookings();
  }, []);

  const handleCheckout = async (bookingId) => {
    try {
      await apiRequest.post(`/bookings/${bookingId}/checkout`); // Assume there's a checkout route
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, bookingStatus: "Checked out" }
            : booking
        )
      );
    } catch (err) {
      setError("Failed to checkout. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="title">
        <h1 className="font-light text-4xl">User Information</h1>
        <div className="info mt-6 flex flex-col gap-5">
          <span className="flex items-center gap-5">
            Username: <b>{currentUser.username}</b>
          </span>
          <span className="flex items-center gap-5">
            Email: <b>{currentUser.email}</b>
          </span>
          <span className="flex items-center gap-5">
            Contact: <b>{currentUser.contact}</b>
          </span>
        </div>
      </div>

      {/* Booking Information */}
      <div className="mt-10">
        <h2 className="font-light text-3xl mb-4">Your Bookings</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            (booking.room.availabilityStatus || booking.bookingStatus === "Approved") && ( // Only show if the room is available
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg">
                    <span className="font-semibold">Room No:</span> {booking.room.roomNo}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Booking Status:</span> {booking.bookingStatus}
                  </p>
                </div>
                <div>
                  {booking.bookingStatus === "Approved" ? (
                    <button
                      onClick={() => handleCheckout(booking._id)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                    >
                      Checkout
                    </button>
                  ) : booking.bookingStatus === "Pending" ? (
                    <p className="text-yellow-500">Pending...</p>
                  ) : null}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
