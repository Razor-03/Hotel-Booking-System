import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuDisplay(!menuDisplay);
  };

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="text-base sm:text-base h-20 flex justify-between items-center">
      <div className="basis-3/5 flex gap-x-4 xl:gap-x-10 justify-between md:justify-start items-center h-full">
        <div className="z-10" onClick={toggleMenu}>
          <FaBars
            className={`md:hidden ${menuDisplay ? "text-white" : "text-black"}`}
          />
        </div>
        <Link to={"/"} className="flex items-center">
          <span className="font-bold text-lg inline md:hidden lg:inline">
            Hotel Booking System
          </span>
        </Link>
        <Link to={"/"} className="hidden md:inline">
          Home
        </Link>
        {currentUser && currentUser.role === "admin" ? (
          <Link to={"/admin/rooms"} className="hidden md:inline">
            Manage Rooms
          </Link>
        ) : (
          <Link to={"/list"} className="hidden md:inline">
            Browse Rooms
          </Link>
        )}
        <Link to={"/contact"} className="hidden md:inline">
          Contact Us
        </Link>
        {currentUser && currentUser.role === "admin" && (
          <Link to={"/admin/dashboard"} className="hidden md:inline">
            Dashboard
          </Link>
        )}
        {currentUser && currentUser.role === "admin" && (
          <Link to={"/admin/rooms/new"} className="hidden md:inline">
            Add Room
          </Link>
        )}
      </div>
      <div className="basis-2/5 flex  justify-end items-center gap-x-2 sm:gap-x-10 h-full ">
        {currentUser ? (
          <>
            <div className="user flex gap-x-4 items-center font-semibold">
              <span className="hidden md:inline">
                <span className="text-sm font-thin">SIGNED IN AS </span>
                {currentUser.username}
              </span>
            </div>
            {currentUser.role === "user" && (
              <Link
                to="/profile"
                className="py-2 px-4 cursor-pointer bg-[#1d2d44] text-[#f0ebd8] me-3 relative rounded-md hidden md:inline"
              >
                Profile
              </Link>
            )}
            <button
              className="py-2 px-4 cursor-pointer bg-[#1d2d44] text-[#f0ebd8] me-3 relative rounded-md hidden md:inline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"} className="hidden md:inline">
              Log In
            </Link>
            <Link
              to={"/register"}
              className="bg-[#1d2d44] text-[#f0ebd8] py-1 px-3 rounded-md"
            >
              Sign Up
            </Link>
          </>
        )}
        <div
          onClick={() => setMenuDisplay(false)}
          className={`bg-[#0d1321] text-[#f0ebd8] absolute top-0 h-screen w-[50%] flex flex-col items-center justify-center gap-y-12 transition-all ease-linear duration-300 ${
            menuDisplay ? "left-0" : "left-[-50%]"
          }`}
        >
          <Link to={"/"} className="">
            Home
          </Link>
          <Link to={"/list"} className="">
            Browse
          </Link>
          <Link to={"/"} className="">
            About
          </Link>
          <Link to={"/"} className="">
            Contact Us
          </Link>
          <Link to={"/login"} className="">
            Login
          </Link>
          <Link to={"register"} className="">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
