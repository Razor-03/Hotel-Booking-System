import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest.js";
import ManageBookings from "../components/ManageBookings.jsx";
import ManageEmployees from "../components/ManageEmployees.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [revenue, setRevenue] = useState(1);
  const [bookings, setBookings] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    rejectedBookings: 0,
  });
  const [rooms, setRooms] = useState({
    totalRooms: 0,
    availableRooms: 0,
    bookedRooms: 0,
  });

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
      <div className="flex justify-between my-3">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <a href="/admin/rooms/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+ Add Room</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {<RevenueCard revenue={revenue} />}
        { <BookingsCard bookings={bookings} />}
        { <RoomsCard rooms={rooms} />}
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
