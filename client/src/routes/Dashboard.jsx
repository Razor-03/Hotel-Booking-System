import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest.js";
import ManageBookings from "../components/ManageBookings.jsx";
import ManageEmployees from "../components/ManageEmployees.jsx";

const Dashboard = () => {
  const [revenue, setRevenue] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: revenueData } = await apiRequest.get("/bookings/revenue");
        const { data: bookingsData } = await apiRequest.get("/bookings/info");
        const { data: roomsData } = await apiRequest.get("/rooms/info");


        setRevenue(revenueData.revenue);
        if (!revenueData.revenue) {
          setRevenue(1)
        }
        setBookings(bookingsData);
        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {revenue && <RevenueCard revenue={revenue} />}
        {bookings && <BookingsCard bookings={bookings} />}
        {rooms && <RoomsCard rooms={rooms} />}
      </div>
      <ManageBookings />
      <ManageEmployees />
    </div>
  );
};

const RevenueCard = ({ revenue }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <h2 className="text-xl font-semibold mb-2">Revenue</h2>
    <p className="text-gray-700">${revenue.toFixed(2)}</p>
  </div>
);

const BookingsCard = ({ bookings }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <h2 className="text-xl font-semibold mb-2">Bookings</h2>
    <p className="text-gray-700">Total Bookings: {bookings.totalBookings}</p>
    <p className="text-gray-700">Pending Bookings: {bookings.pendingBookings}</p>
    <p className="text-gray-700">Rejected Bookings: {bookings.rejectedBookings}</p>
    <p className="text-gray-700">Approved Bookings: {bookings.approvedBookings}</p>
  </div>
);

const RoomsCard = ({ rooms }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <h2 className="text-xl font-semibold mb-2">Rooms</h2>
    <p className="text-gray-700">Total Rooms: {rooms.totalRooms}</p>
    <p className="text-gray-700">Available Rooms: {rooms.availableRooms}</p>
    <p className="text-gray-700">Booked Rooms: {rooms.bookedRooms}</p>
  </div>
);

export default Dashboard;
