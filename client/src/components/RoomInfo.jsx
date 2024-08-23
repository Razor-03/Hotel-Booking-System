import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";

const RoomInfo = ({ room }) => {
  const { currentUser } = useContext(AuthContext);
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
        </div>
        {currentUser && currentUser.role === "admin" && (
          <div className="user flex px-12 flex-col items-center justify-center gap-4 rounded-md font-semibold">
            <button className="bg-rose-700 flex gap-2 items-center p-3 rounded-md text-white">
              <FaTrash /> Delete Room
            </button>
          </div>
        )}
      </div>
      <div className="bottom text-[#555] mt-10 leading-relaxed">
        <p>{room.description}</p>
      </div>
    </div>
  );
};

export default RoomInfo;
