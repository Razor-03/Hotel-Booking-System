import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaTrash } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { useContext } from "react";
import Room from "../../../api/models/room.schema";
import RoomBookingForm from "./RoomBookingForm";

const RoomInfo = ({ room }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(room);
  return (
    <div className="info mt-10">
      <div className="top flex justify-between">
        <div className="post flex flex-col gap-2">
          <h1 className="text-4xl font-semibold">Room #{room.roomNo}</h1>
          <div className="address flex gap-1 items-center text-[#888]">
            <span>Floor #{room.floor}</span>
          </div>
          <div className="price text-lg font-light py-2 px-3 bg-[#ffe6a7] w-fit rounded-md">
            $ {room.pricePerNight}
          </div>
          <div className="bottom text-[#555] mt-10 leading-relaxed">
            <p>{room.description}</p>
          </div>
        </div>
        {currentUser && currentUser.role === "admin" ? (
          <div className="user flex px-12 flex-col items-center justify-center gap-4 rounded-md font-semibold">
            <button className="bg-rose-700 flex gap-2 items-center p-3 rounded-md text-white">
              <FaTrash /> Delete Room
            </button>
          </div>
        ) : (
          <div className="user flex px-12 flex-col items-center justify-center gap-4 rounded-md font-semibold">
            <RoomBookingForm roomId={room._id} />
          </div>
        )}
      </div>
      {currentUser && currentUser.role === "admin" && (
        <div className="mt-3">
          <h1 className="font-semibold text-2xl">Room History</h1>
          {room.history.map((history) => (
            <div
              key={history._id}
              className="bg-white shadow-lg rounded-lg p-6 mt-4 border border-gray-200"
            >
              <div className="flex flex-col gap-4 items-start">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">
                    {history.user.username}
                  </p>
                  <p className="text-sm text-gray-500">{history.user.email}</p>
                  <p className="text-sm text-gray-500">
                    {history.user.contact}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Arrival Date:</span>{" "}
                    {history.arrivalDate}
                  </p>
                  <p>
                    <span className="font-medium">Departure Date:</span>{" "}
                    {history.departureDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomInfo;
